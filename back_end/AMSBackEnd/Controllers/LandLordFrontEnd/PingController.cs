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
using Newtonsoft.Json.Linq;
using RestSharp;

//controller is used to keep the to keep the the backend/database from going to sleep. Improving response times
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

        //end used by ping service to return dummy data
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