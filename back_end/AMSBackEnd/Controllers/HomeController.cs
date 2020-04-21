using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSBackEnd.Model;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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

        [Route("[action]")]
        public IActionResult GetReceiptTotals()
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







    }
}
