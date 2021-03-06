﻿using AMSBackEnd.Model;
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
using System.Net.Http;
using System.Net;
using Microsoft.AspNetCore.Authorization;
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
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }
            string DateAdded = DateTime.UtcNow.ToString("yyyy-MM-dd");
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            PropertyModel propertyModel = data["property"].ToObject<PropertyModel>();

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"insert into Properties
        (Street,City,State,ZipCode,Unit,YearlyInsurance,Tax,Guid,Auth0ID, lat, lng,DateAdded) values
        (@Street,@City,@State,@ZipCode,@Unit,@YearlyInsurance,@Tax,@Guid,
        @LoginUserIdentifier,@lat,@lng,@DateAdded)";
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
                    LoginUserIdentifier = LoginUserIdentifier,
                    lat = propertyModel.Lat,
                    lng = propertyModel.Lng,
                    DateAdded = DateAdded
                }

                            );

            }
            return Ok();

        }

        //updates property settings in the database 
        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdateProperty([FromBody] JObject data)
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
                                            ZipCode = @ZipCode,
                                            lat = @Lat,
                                            lng = @Lng
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
                    LoginUserIdentifier = LoginUserIdentifier,
                    lat = propertyModel.Lat,
                    lng = propertyModel.Lng

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
            catch (Exception)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<PropertyModel> Properties = new List<PropertyModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                Properties = db.Query<PropertyModel>("select * from Properties where Auth0ID = @LoginUserIdentifier",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }
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
            catch (Exception)
            {
                LoginUserIdentifier = "";


            }
            var connstr = _config["ConnectionStrings:DefaultConnection"];
            using (IDbConnection db = new SqlConnection(connstr))
            {

                var SqlStr = @"Delete from tenants
                                    where guid = @Guid and LandLordAuth0ID = @LoginUserIdentifier";
                db.Execute(SqlStr, new
                {
                    Guid = id,
                    LoginUserIdentifier = LoginUserIdentifier
                });



                SqlStr = @"Delete from Properties
                                    where Guid = @Guid and Auth0ID = @LoginUserIdentifier";
                db.Execute(SqlStr, new
                {
                    Guid = id,
                    LoginUserIdentifier = LoginUserIdentifier
                });

            }
            return Ok();


        }


        //end used to return auto suggested addresses to the client / hide API key in the backend 
        [HttpGet]
        [Route("[action]")]
        public String GetSuggestedPropertiesAddress(string query)
        {

            var BaseUrl = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json";


            var apiKey = _config["SuggAddrApiKey"];
            var country = "USA";
            var query2 = query.Replace(" ", "+");
            var maxresults = "20";
            var urlParameters = "?apiKey=" + apiKey + "&query=" + query2 + "&maxresults=" + maxresults + "&country=" + country;
            var url = BaseUrl + urlParameters;
            using (var client = new HttpClient())
            {
                var request = (HttpWebRequest)WebRequest.Create(url);
                //  request.KeepAlive = false;

                //here check for the authentication headers if any
                request.PreAuthenticate = true;

                //For JSON Response .....
                request.Method = "GET";
                request.ContentType = "application/json";

                var response = (HttpWebResponse)request.GetResponse();

                string s = response.ToString();
                StreamReader reader = new StreamReader(response.GetResponseStream());

                var result = reader.ReadToEnd().Trim();
                return (result);

            }



        }


        // used to get a Lat and Lng of a selected suggested property
        [HttpGet]
        [Route("[action]")]
        public String GetSuggestedPropertiesLatLng(string query)
        {

            var BaseUrl = "https://geocode.search.hereapi.com/v1/geocode";
            var apiKey = _config["SuggAddrApiKey"];
            var query2 = query.Replace(" ", "+");
            var urlParameters = "?apiKey=" + apiKey + "&q=" + query2;
            var url = BaseUrl + urlParameters;
            using (var client = new HttpClient())
            {
                var request = (HttpWebRequest)WebRequest.Create(url);
                //  request.KeepAlive = false;

                //here check for the authentication headers if any
                request.PreAuthenticate = true;

                //For JSON Response .....
                request.Method = "GET";
                request.ContentType = "application/json";

                var response = (HttpWebResponse)request.GetResponse();

                string s = response.ToString();
                StreamReader reader = new StreamReader(response.GetResponseStream());

                var result = reader.ReadToEnd().Trim();
                return (result);

            }



        }



    }

}