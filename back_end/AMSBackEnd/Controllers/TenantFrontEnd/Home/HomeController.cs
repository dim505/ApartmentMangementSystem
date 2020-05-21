using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
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



        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdateTenantInfo([FromBody] JObject data) {

            var LoginUserIdentifier = "";
            try
            {
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            }
            catch
            {
                LoginUserIdentifier = "";
            }
            var ConnStr = _config["ConnectionStrings:DefaultConnection"];
            UpdateTenantInfo updateTenantInfo = data["tenant"].ToObject<UpdateTenantInfo>();
            using (IDbConnection db = new SqlConnection(ConnStr)) {
                var SqlStr = @"Update tenants 
                                set Name = @Name, 
                                    Phone = @PhoneNumber
                            where Email = @Email";
                var result = db.Execute(SqlStr,
                    new
                    {
                        Name = updateTenantInfo.Name,
                        Email = updateTenantInfo.Email,
                        PhoneNumber = updateTenantInfo.PhoneNumber
                    }
                    );
                return Ok();
                ;
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddTenantImage([FromForm] IFormFile body)
        {

            var LoginUserIdentifier = "";
            try
            {
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            }
            catch
            {
                LoginUserIdentifier = "";
            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            byte[] filesBytes;
            using (var memoryStream = new MemoryStream()) {
                await body.CopyToAsync(memoryStream);
                filesBytes = memoryStream.ToArray();
            }

            using (IDbConnection db = new SqlConnection(connStr))
            {
                List<ImageCount> imageCounts = new List<ImageCount>();
                var SqlStr = @"Select count(*) as count from 
                                        TenantImage where Auth0ID = @Auth0ID";

                imageCounts = db.Query<ImageCount>(SqlStr, 
                    new { Auth0ID = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true  } }
                    
                    ).ToList();


                if (imageCounts[0].count == 0) {
                    SqlStr = @"insert into TenantImage values (@Image, @FileName, @ContentType, @Auth0ID)";
                    var result = db.Execute(SqlStr, new
                    {
                        Image = filesBytes,
                        FileName = body.FileName,
                        ContentType = body.ContentType,
                        Auth0ID = LoginUserIdentifier

                    });

                } else if (imageCounts[0].count == 1) {
                    SqlStr = @"Update TenantImage 
                                set Image = @Image,
                                    FileName = @FileName,
                                    ContentType = @ContentType     
                               where Auth0ID = @Auth0ID";

                    var result = db.Execute(SqlStr, new
                    {
                        Image = filesBytes,
                        FileName = body.FileName,
                        ContentType = body.ContentType,
                        Auth0ID = LoginUserIdentifier
                    });



                }

            
            }

            return Ok();
        }

        [HttpGet]
        [Route("[action]")]

        public IActionResult GetProfilePhoto ([FromRoute] string email)
        {

            var LoginUserIdentifier = "";
            try
            {
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            }
            catch
            {
                LoginUserIdentifier = "";
            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<ProfilePictures> results = new List<ProfilePictures>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                results = db.Query<ProfilePictures>("select * from TenantImage where Auth0ID = @Auth0ID",
                    new { Auth0ID = LoginUserIdentifier }).ToList();
            }
            return Ok(results);


        }
 
    
    
    }
}