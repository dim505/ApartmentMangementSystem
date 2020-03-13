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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace AMSBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {

        private readonly IConfiguration _config;

        public PropertyController(IConfiguration config)
        {
            _config = config;
        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult AddProperty([FromBody]JObject data)
        {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            PropertyModel propertyModel = data["property"].ToObject<PropertyModel>();

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"insert into Properties(Street,City,State,Unit,YearlyInsurance,Tax,Guid) values (@Street,@City,@State,@Unit,@YearlyInsurance,@Tax,@Guid)";
                var result = db.Execute(SqlStr, new
                {
                           Street = propertyModel.Street,
                            City = propertyModel.City,
                            State = propertyModel.State,
                            Unit = propertyModel.Unit,
                            YearlyInsurance = propertyModel.YearlyInsurance,
                            Tax = propertyModel.Tax,
                            Guid = propertyModel.Guid
                }


                    );

            }
            return Ok();

        }

        [HttpGet]

        //this gets all the receipts from the database
        public IActionResult GetProperties()
        {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<PropertyModel> Properties = new List<PropertyModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                Properties = db.Query<PropertyModel>("select * from Properties").ToList();
            }
            return Ok(Properties);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteProperty(string id) 
        {
            var connstr = _config["ConnectionStrings:DefaultConnection"];
            using (IDbConnection db = new SqlConnection(connstr)) {

                var SqlStr = @"Delete from Properties
                                    where Guid = @Guid";
                db.Execute(SqlStr, new { Guid = id });

            }
            return Ok();
        
        
        }




    }
}