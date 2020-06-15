using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSBackEnd.Model.LandLordFrontEnd.AccountDetails;

using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using RestSharp;


//this controller takes care of all the end points related to the account details page 
namespace AMSBackEnd.Controllers.LandLordFrontEnd
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountDetailsController : ControllerBase
    {

        private readonly IConfiguration _config;
        public AccountDetailsController(IConfiguration config)
        {
            _config = config;

        }


		//end point responisble for updating and adding the landlord profile picture in the database
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Add_Update_LandLord_Image([FromForm] IFormFile body)
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
            using (var memoryStream = new MemoryStream())
            {
                await body.CopyToAsync(memoryStream);
                filesBytes = memoryStream.ToArray();
            }

            using (IDbConnection db = new SqlConnection(connStr))
            {
                List<ImageCount> imageCounts = new List<ImageCount>();
                var SqlStr = @"Select count(*) as count from 
                                        LandLordProfileImage where Auth0ID = @LoginUserIdentifier";

                imageCounts = db.Query<ImageCount>(SqlStr,
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }

                    ).ToList();


                if (imageCounts[0].count == 0)
                {
                    SqlStr = @"insert into LandLordProfileImage values (@Image, @FileName, @ContentType, @Auth0ID)";
                    var result = db.Execute(SqlStr, new
                    {
                        Image = filesBytes,
                        FileName = body.FileName,
                        ContentType = body.ContentType,
                        Auth0ID = LoginUserIdentifier

                    });

                }
                else if (imageCounts[0].count == 1)
                {
                    SqlStr = @"Update LandLordProfileImage 
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


		//this endpoint is responsible for updating the text portion of the landlord information 
        [HttpPost]
        [Route("[action]")]
        public IActionResult Add_Update_LandLordInfo([FromBody] JObject data)
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
            AccountDetails accountDetails = data["accountDetails"].ToObject<AccountDetails>();


            using (IDbConnection db = new SqlConnection(connStr))
            {

                var SqlStr = @"select count(*) as count from LandLordAccountDetails " +
                    "where Auth0ID = @Auth0ID";
                List<ImageCount> imageCounts = new List<ImageCount>();
                imageCounts = db.Query<ImageCount>(SqlStr, new
                { Auth0ID = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }).ToList();
                if (imageCounts[0].count == 0)
                {
                    SqlStr = @"insert into LandLordAccountDetails 
                        values (@Name, @Email, @PhoneNumber, @Auth0ID)";
                    var result = db.Execute(SqlStr, new
                    {
                        Name = accountDetails.Name,
                        Email = accountDetails.Email,
                        PhoneNumber = accountDetails.PhoneNumber,
                        Auth0ID = LoginUserIdentifier
                    });

                }
                else if (imageCounts[0].count == 1)
                {

                    SqlStr = @"update  LandLordAccountDetails 
		                            set Name = @Name,
			                        Email = @Email,
			                        PhoneNumber = @PhoneNumber
                            where Auth0ID = @Auth0ID";

                    var result = db.Execute(SqlStr, new
                    {
                        Name = accountDetails.Name,
                        Email = accountDetails.Email,
                        PhoneNumber = accountDetails.PhoneNumber,
                        Auth0ID = LoginUserIdentifier
                    });
                }
            }

            return Ok();
        }

		//this endpoint gets the landlord information to get display on the accounts detailed page 
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAccountInfo()
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

            List<AccountDetails> accountDetails = new List<AccountDetails>();

            using (IDbConnection db = new SqlConnection(connStr))
            {

                var SqlStr = "select * from LandLordAccountDetails " +
                    "where Auth0ID = @Auth0ID";
                accountDetails = db.Query<AccountDetails>(SqlStr,
                    new
                    {
                        Auth0ID = new DbString
                        {
                            Value = LoginUserIdentifier,
                            IsFixedLength = false,
                            IsAnsi = true
                        }
                    }
                    ).ToList();
            }
            return Ok(accountDetails);

        }
		
			
		 //this end point gets the profile picture to display on the accounts detailed page for the landlord
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAccountPhotoInfo()
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

            List<AccountPhoto> accountPhoto = new List<AccountPhoto>();

            using (IDbConnection db = new SqlConnection(connStr))
            {

                var SqlStr = "select * from LandLordProfileImage where Auth0ID = @Auth0ID";
                accountPhoto = db.Query<AccountPhoto>(SqlStr,
                    new
                    {
                        Auth0ID = new DbString
                        {
                            Value = LoginUserIdentifier,
                            IsFixedLength = false,
                            IsAnsi = true
                        }
                    }
                    ).ToList();
            }
            return Ok(accountPhoto);

        }



    }
}