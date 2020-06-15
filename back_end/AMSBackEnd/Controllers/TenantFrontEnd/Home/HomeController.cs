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
using SendGrid;
using SendGrid.Helpers.Mail;


//this controller is responsible for getting all the information about the home page 
namespace AMSBackEnd.Controllers.TenantFrontEnd.Home
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenHomeController : ControllerBase
    {

        private readonly IConfiguration _config;
        public TenHomeController(IConfiguration config) {
            _config = config;

        }

		//this endpoint gets all the account details of the home page 
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
	
			//making API call to get temp token to be able to interact with Auth0 Management API 
            var client = new RestClient("https://dev-5wttvoce.auth0.com/oauth/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{\"client_id\":\"bOZwndtAhxyj5wEC2AjhUbYfjEPQmIju\",\"client_secret\":\"bcqkAKKWJ8jOu_3pwwZ9d_cfzrInwMDzqhSry9qexmkUnwiejjnzQGjyr5ar2J-1\",\"audience\":\"https://dev-5wttvoce.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            JObject joResponse = JObject.Parse(response.Content);

            var HeaderString = "Bearer " + (string)joResponse.SelectToken("access_token");



            var GetUserEmailUrl = "https://dev-5wttvoce.auth0.com/api/v2/users/" + LoginUserIdentifier;

			//making api call to get Auth0 email from Auth0ID
            client = new RestClient(GetUserEmailUrl);
            request = new RestRequest(Method.GET);
            request.AddHeader("authorization", HeaderString);
            IRestResponse response2 = client.Execute(request);

            JObject joResponse2 = JObject.Parse(response2.Content);
            var Useremail = (string)joResponse2.SelectToken("email");

            var connStr = _config["ConnectionStrings:DefaultConnection"];

            List<TenantHomePage> HomePageInfo = new List<TenantHomePage>();
			//Nows since it got the Tenants email it will get the information for the home page such as address,landlord info, and tenant info
            using (IDbConnection db = new SqlConnection(connStr))
            {
                HomePageInfo = db.Query<TenantHomePage>("select ten.tenGuid, ten.Name,ten.Phone, ten.Email, LandAcctDeet.Name as LandLordName," +
                    " LandAcctDeet.Email as LandLordEmail, LandAcctDeet.PhoneNumber as LandLordPhoneNumber, prop.Street, prop.State, " +
                    "prop.City, prop.ZipCode from tenants ten inner join Properties prop on ten.guid = prop.Guid inner join LandLordAccountDetails " +
                    "LandAcctDeet on prop.Auth0ID = LandAcctDeet.Auth0ID where ten.Email = @email",
                    new { email = new DbString { Value = Useremail, IsFixedLength = false, IsAnsi = true } }
                    ).ToList();
            }
            return Ok(HomePageInfo);

        }


		//this endpoint sends a message to the landlord from the tenant via email 
        [HttpPost]
        [Route("[action]")]
        public IActionResult ContactLandLord([FromBody] JObject data) {
            var ConnStr = _config["ConnectionStrings:DefaultConnection"];
            SendMessage sendMessage = data["message"].ToObject<SendMessage>();
            var apiKey = _config["SendMailApiKey"];
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("sendemailams@gmail.com", "Email Service"),
                Subject = "TENANT MESSAGE: " + sendMessage.Subject,
                 
                HtmlContent = "<strong> Message sent from " + sendMessage.FromEmail  + "</br>"+ sendMessage.Message + " </strong>"
            };
            msg.AddTo(new EmailAddress(sendMessage.ToEmail, ""));
            var response = client.SendEmailAsync(msg);
            return Ok();

        }

		//THIS ENDpoint is responsible for updating the tenants personal information 
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

		//this endpoint is responsible for updating/adding the tenants profile image 
        [HttpPost]
        [Route("[action]/{email}")]
        public async Task<IActionResult> AddTenantImage(string email, [FromForm] IFormFile body)
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
                    SqlStr = @"insert into TenantImage values (@Image, @FileName, @ContentType, @Auth0ID, @email)";
                    var result = db.Execute(SqlStr, new
                    {
                        Image = filesBytes,
                        FileName = body.FileName,
                        ContentType = body.ContentType,
                        Auth0ID = LoginUserIdentifier,
                        email = email

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


		//this endpoint gets all the profile photos for the home page 
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
                var SqlStr = @"select tenimg.image as Tenimage,	tenimg.filename as Tenfilename,	tenimg.contentType as TencontentType,	tenimg.Auth0ID as TenAuth0ID,	tenimg.email as Tenemail,	LandImg.image as Landimage,	LandImg.filename as Landfilename,	LandImg.contentType as LandcontentType,	LandImg.Auth0ID as LandAuth0ID from tenants ten inner join TenantImage tenimg on ten.Email = tenimg.email inner join Properties prop on ten.guid = prop.Guid  inner join LandLordAccountDetails LandAcctDeet  on prop.Auth0ID = LandAcctDeet.Auth0ID inner join LandLordProfileImage LandImg on LandAcctDeet.Auth0ID = LandImg.Auth0ID where tenimg.Auth0ID = @Auth0ID";
                results = db.Query<ProfilePictures>(SqlStr,
                    new { Auth0ID = LoginUserIdentifier }).ToList();
            }
            return Ok(results);


        }



		//THIS endpoint gets all the news for the tenant related this his apartment 
        [HttpGet]
        [Route("[action]/{email}")]

        public IActionResult GetNews([FromRoute] string email)
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
            List<GetNews> results = new List<GetNews>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"select Subject, Message, news.DateAdded from tenants ten inner join Properties prop on ten.guid = prop.Guid inner join Announcements news on prop.Guid = news.PropGuid where ten.Email = @email";
                results = db.Query<GetNews>(SqlStr,
                    new { email = email }).ToList();
            }
            return Ok(results);


        }



    }
}