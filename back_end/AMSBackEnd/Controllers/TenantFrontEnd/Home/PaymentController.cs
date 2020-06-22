using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSBackEnd.Model.TenantFrontEnd;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Stripe;
using WebApplication3.Modal;

namespace WebApplication3.Controllers
{


 
	 //this controller is responsible for dealing with the payment information and charging of the the tenant 
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {

        private readonly IConfiguration _config;
        public PaymentController(IConfiguration config) {
            _config = config;

        }


		//this will get the payment history of a tenant for the payment history page
        [HttpGet]
        [Route("[action]/{email}")]
        public IActionResult GetPaymentHistory([FromRoute] string Email) {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<PaymentHistory> paymentHistories = new List<PaymentHistory>();
            var SqlStr = @"select rent.TenGuid, rent.DatePaid, CONVERT(char(3), DATENAME(MONTH, rent.DatePaid), 0) + ' ' + Datename(YEAR, rent.DatePaid) as ShortDate, 
            DATEADD(DAY, 1, EOMONTH(rent.DatePaid, -1)) as FirstOfMonth, CONVERT(DATE, DATEADD(d, -(DAY(DATEADD(m, 1, rent.DatePaid))), DATEADD(m, 1, rent.DatePaid))) as LastDateOfMonth, 
            rent.AmountPaid from tenants ten inner join  RentHistory rent on ten.tenGuid = rent.TenGuid where ten.Email = @Email
            order by convert(datetime, rent.DatePaid, 120) desc
";
            using (IDbConnection db = new SqlConnection(connStr)) {
                paymentHistories = db.Query<PaymentHistory>(SqlStr,
                    new { Email = new DbString { Value = Email, IsFixedLength = false, IsAnsi = true } }).ToList();
            }


            return Ok(paymentHistories);
        }


        //this will get the payment history summary for the payment history info card
        [HttpGet]
        [Route("[action]/{email}")]
        public IActionResult GetPaymentHistoryInfoCard([FromRoute] string Email)
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<PaymentHistInfoCard> paymentHistInfoCard = new List<PaymentHistInfoCard>();
            var SqlStr = @"select ShortDate, SUM(AmountPaid) as AmountPaid from 
                            (
                            select CONVERT(char(3), DATENAME(MONTH, rent.DatePaid), 0) + ' ' + 
                            Datename(YEAR, rent.DatePaid) as ShortDate, rent.AmountPaid
                            from tenants ten 
                            inner join  RentHistory rent on ten.tenGuid = rent.TenGuid 
                            where ten.Email = @Email
                             ) src
                             group by ShortDate";
            using (IDbConnection db = new SqlConnection(connStr))
            {
                paymentHistInfoCard = db.Query<PaymentHistInfoCard>(SqlStr,
                    new { Email = new DbString { Value = Email, IsFixedLength = false, IsAnsi = true } }).ToList();
            }


            return Ok(paymentHistInfoCard);
        }

        //this endpoint will get the necessary information for the outstanding balance info card 
        [HttpGet]
        [Route("[action]/{email}")]
        public IActionResult GetWhenRentDue([FromRoute] string Email)
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }


            var SqlStr = @"select CONVERT(varchar(10),CONVERT(DATE, DATEADD(d, -( DAY(DATEADD(m, 1, GETDATE())) ), DATEADD(m, 1, GetDate()))),101) as RentDueDate,  (select DATEDIFF(month,  DateAdded, GetDate()) *  RentDueEaMon  from tenants where Email = @Email) - SUM(AmountPaid )  as RentDue   from tenants ten  inner join  RentHistory rent on ten.tenGuid = rent.TenGuid where ten.Email = @email";
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<WhenRentDue> whenRentDues = new List<WhenRentDue>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                whenRentDues = db.Query<WhenRentDue>(SqlStr, new { email = new DbString { Value = Email, IsFixedLength = false, IsAnsi = true } }).ToList();
            }

            return Ok(whenRentDues);






        }


		//this endpoint is responsible for charging the customers credit card for the rent 
        [HttpPost]
        [Route("[action]")]
        public IActionResult ChargeRents([FromBody] JObject data)
        {


            var ConnStr = _config["ConnectionStrings:DefaultConnection"];
            ChargeRent chargeRent = data["Payment"].ToObject<ChargeRent>();


            ChargeCustomer(chargeRent.token, chargeRent.AmtDue, chargeRent.Email);
            string DateAdded = DateTime.UtcNow.ToString();
            using (IDbConnection db = new SqlConnection(ConnStr))
            {
                var SqlStr = @"insert into RentHistory values  (@TenGuid,@AmtDue,@DateAdded)";
                var result = db.Execute(SqlStr,
                    new
                    {
                        TenGuid = chargeRent.TenGuid,
                        AmtDue = chargeRent.AmtDue,
                        DateAdded = DateAdded
                    }
                    );
                return Ok();







            }
        }
			//function used to charge the customer 
            private void ChargeCustomer(string paymentToken, decimal RentTotal, string email)
        {
            //defined api key  to identify one self to strip 
            StripeConfiguration.ApiKey = "sk_test_wGglOzyHYIB92w1Pv5LAUtTD00pF5tUIbg";

            var options = new ChargeCreateOptions()
            {
                //specifies the amount to charge
                Amount = Convert.ToInt64(RentTotal * 100),
                //specifies currency 
                Currency = "USD",
                //specifies customer credit card 
                Source = paymentToken,
                //also sents customers email to strip for additional identification 
                Metadata = new Dictionary<string, string>() { { "CustomerEmail", email } }

            };
            //charges the customer                                      
            var service = new ChargeService();
            Charge charge = service.Create(options);
        }

    }






    
}