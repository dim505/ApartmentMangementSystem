using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AMSBackEnd.Model;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors;

//PropertyController is responsible for all action methods related to the property page 
namespace AMSBackEnd.Controllers
{
    [Authorize]   
    [Route("api/[controller]")]
    [ApiController]
    
    public class PropertyController : ControllerBase
    {

        private readonly IConfiguration _config;

        public PropertyController(IConfiguration config)
        {
            _config = config;
        }
	
		//adds property to database
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddProperty([FromBody]JObject data)
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
            PropertyModel propertyModel = data["property"].ToObject<PropertyModel>();

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"insert into Properties
                (Street,City,State,ZipCode,Unit,YearlyInsurance,Tax,Guid,Auth0ID) values
                (@Street,@City,@State,@ZipCode,@Unit,@YearlyInsurance,@Tax,@Guid, @LoginUserIdentifier)";
                var result = db.Execute(SqlStr, new
                {
                           Street = propertyModel.Street,
                            City = propertyModel.City,
                            State = propertyModel.State,
                            ZipCode = propertyModel.ZipCode,
                            Unit = propertyModel.Unit,
                            YearlyInsurance = propertyModel.YearlyInsurance,
                            Tax = propertyModel.Tax,
                            Guid = propertyModel.Guid,
                            LoginUserIdentifier = LoginUserIdentifier
                }

                    );

            }
            return Ok();

        }

		//updates property settings in the database 
        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdateProperty([FromBody] JObject data) {
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

            var connstr = _config["ConnectionStrings:DefaultConnection"];
            PropertyModel propertyModel = data["property"].ToObject<PropertyModel>();

            using (IDbConnection db = new SqlConnection(connstr))
            {
                var SqlStr = @"Update Properties
                                        set Street = @Street,
                                            City = @City,
                                            State = @State,
                                            Unit = @Unit,
                                            YearlyInsurance = @YearlyInsurance,
                                            Tax = @Tax,
                                            ZipCode = @ZipCode
                                        where Guid = @Guid and Auth0ID = @LoginUserIdentifier";
                var result = db.Execute(SqlStr, new
                {
                    Street = propertyModel.Street,
                    City = propertyModel.City,
                    State = propertyModel.State,
                    ZipCode = propertyModel.ZipCode,
                    Unit = propertyModel.Unit,
                    YearlyInsurance = propertyModel.YearlyInsurance,
                    Tax = propertyModel.Tax,
                    Guid = propertyModel.Guid,
                    LoginUserIdentifier = LoginUserIdentifier

                });
                return Ok();
                }
        }

        [HttpGet]

        //this gets all the properties from the database
        public IActionResult GetProperties()
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
            List<PropertyModel> Properties = new List<PropertyModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                Properties = db.Query<PropertyModel>("select * from Properties where Auth0ID = @LoginUserIdentifier",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true} }
                    ).ToList();
            }
            return Ok(Properties);
        }

		//deletes a property from the database
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteProperty(string id) 
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
            var connstr = _config["ConnectionStrings:DefaultConnection"];
            using (IDbConnection db = new SqlConnection(connstr)) {

                var SqlStr = @"Delete from Properties
                                    where Guid = @Guid and Auth0ID = @LoginUserIdentifier";
                db.Execute(SqlStr, new { Guid = id,
                                            LoginUserIdentifier = LoginUserIdentifier
                });

            }
            return Ok();
        
        
        }




    }
}