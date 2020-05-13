using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSBackEnd.Model.TenantFrontEnd;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace AMSBackEnd.Controllers.TenantFrontEnd.Home
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        private readonly IConfiguration _config;
        public HomeController(IConfiguration config) {
            _config = config;
        
        }

        [Route("GetAccountDetails")]
        public IActionResult GetAccountDetails(string email) 
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

            var client = new RestClient("https://dev-5wttvoce.auth0.com/oauth/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{\"client_id\":\"bOZwndtAhxyj5wEC2AjhUbYfjEPQmIju\",\"client_secret\":\"bcqkAKKWJ8jOu_3pwwZ9d_cfzrInwMDzqhSry9qexmkUnwiejjnzQGjyr5ar2J-1\",\"audience\":\"https://dev-5wttvoce.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            JObject joResponse = JObject.Parse(response.Content);

            var HeaderString = "Bearer " + (string)joResponse.SelectToken("access_token");



            var GetUserEmailUrl = "https://dev-5wttvoce.auth0.com/api/v2/users/" + LoginUserIdentifier;


            client = new RestClient(GetUserEmailUrl);
            request = new RestRequest(Method.GET);
            request.AddHeader("authorization", HeaderString);
            IRestResponse response2 = client.Execute(request);

            JObject joResponse2 = JObject.Parse(response2.Content);
            var Useremail = (string)joResponse2.SelectToken("email");

            var connStr = _config["ConnectionStrings:DefaultConnection"];

            List<TenantHomePage> HomePageInfo = new List<TenantHomePage>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                HomePageInfo = db.Query<TenantHomePage>("select ten.Name,ten.Phone," +
                    " ten.Email, prop.Street, prop.State, prop.City," +
                    "prop.ZipCode from tenants ten" +
                    " inner join Properties prop on ten.guid = prop.Guid " +
                    "where ten.Email = @email",
                    new { email = new DbString { Value = Useremail, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(HomePageInfo);

        }
    }
}