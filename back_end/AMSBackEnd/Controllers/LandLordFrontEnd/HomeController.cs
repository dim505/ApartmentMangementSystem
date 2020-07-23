using AMSBackEnd.Model;
using AMSBackEnd.Model.home;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSBackEnd.Model;
using AMSBackEnd.Model.home;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;


//controller responds to call API calls on the Home Page.
namespace AMSBackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        private readonly IConfiguration _config;

        public HomeController(IConfiguration config)
        {
            _config = config;
        }

        //get Receipt Totals for the Monthly expenses graph 
        [Route("[action]")]
        public IActionResult GetReceiptTotals()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<ReceiptExpenseGraph> ReceiptTotal = new List<ReceiptExpenseGraph>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                ReceiptTotal = db.Query<ReceiptExpenseGraph>("select LEFT(Date,7) + '-30' " +
                    "as Date, SUM(TotalAmount) as TotalAmount from Receipts " +
                    "where Auth0ID = @LoginUserIdentifier group by LEFT(Date, 7)",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(ReceiptTotal);
        }

        //gets info for one of the quick facts cards 
        [Route("[action]")]
        public IActionResult YearlyPropExp()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<YearlyPropExp> YearlyPropExp = new List<YearlyPropExp>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                YearlyPropExp = db.Query<YearlyPropExp>("select  SUM(TotalAmount) " +
                    "as YearlyPropExp from Receipts" +
                    " where Date > DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) and Auth0ID = @LoginUserIdentifier",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(YearlyPropExp);
        }

        //gets info for one of the quick facts cards 
        [Route("[action]")]
        public IActionResult NumberOFTenants()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<NumberOFTenants> numberOFTenants = new List<NumberOFTenants>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                numberOFTenants = db.Query<NumberOFTenants>("select " +
                    "count(*) as [NumberOFTenants] from tenants" +
                    " where LandLordAuth0ID = @LoginUserIdentifier",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(numberOFTenants);
        }

        //gets info for one of the quick facts cards 
        [Route("[action]")]
        public IActionResult PropertyStats()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<PropertyStats> propertyStats = new List<PropertyStats>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                propertyStats = db.Query<PropertyStats>(" select Count(*) as" +
                    " [NumberOfProperties], SUM(Tax) as [TotalTax], " +
                    "SUM(YearlyInsurance) as [TotalInsurance] from Properties" +
                    " where Auth0ID = @LoginUserIdentifier",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(propertyStats);
        }

        //gets info for one of the graphs 
        [Route("[action]")]
        public IActionResult NumOfTenEachMonth()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<NumOfTenPerMonth> NumOfTenPerMonth = new List<NumOfTenPerMonth>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                NumOfTenPerMonth = db.Query<NumOfTenPerMonth>("select " +
                    "LEFT(DateAdded,7) + '-30' as Date, count(*) as " +
                    "NumOfTenPerMonth from tenants " +
                    "where LandLordAuth0ID = @LoginUserIdentifier " +
                    "group by LEFT(DateAdded, 7)",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(NumOfTenPerMonth);
        }


        //gets info for one of the quick facts cards 
        [Route("[action]")]
        public IActionResult NumOfPropPerYear()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<NumberOfPropPerYr> numberOfPropPerYr = new List<NumberOfPropPerYr>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                numberOfPropPerYr = db.Query<NumberOfPropPerYr>("select LEFT(DateAdded,4) + ' ' as Date, " +
                    "count(*) as NumOfPropPerYr from Properties  " +
                    "where Auth0ID = @LoginUserIdentifier " +
                    "group by LEFT(DateAdded, 4) "


                   ,
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(numberOfPropPerYr);
        }
    }
}
