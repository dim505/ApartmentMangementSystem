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


        [HttpGet]
        [Route("[action]")]
        //end used by ping service to return dummy data
        public IActionResult GetToken()
        {

            var client = new RestClient("https://dev-5wttvoce.auth0.com/oauth/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{\"client_id\":\"bOZwndtAhxyj5wEC2AjhUbYfjEPQmIju\",\"client_secret\":\"bcqkAKKWJ8jOu_3pwwZ9d_cfzrInwMDzqhSry9qexmkUnwiejjnzQGjyr5ar2J-1\",\"audience\":\"https://dev-5wttvoce.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            JObject joResponse = JObject.Parse(response.Content);

            var HeaderString = "Bearer " + (string)joResponse.SelectToken("access_token");

            




             client = new RestClient("https://dev-5wttvoce.auth0.com/api/v2/users/USER_ID");
             request = new RestRequest(Method.GET);
            request.AddHeader("authorization", HeaderString);
            IRestResponse response2 = client.Execute(request);


            

            return Ok(response2);

        }






    }
}