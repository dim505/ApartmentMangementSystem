using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AMSBackEnd.Model;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AMSBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {

        private readonly IConfiguration _config;

        public PingController(IConfiguration config)
        {
            _config = config;

        }



        [HttpGet]

        //this gets all the properties from the database
        public IActionResult RespondPing()
        {

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<Ping> Ping = new List<Ping>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                Ping = db.Query<Ping>("select * from PingTest").ToList();
            }

            return Ok(Ping);

        }








    }
}