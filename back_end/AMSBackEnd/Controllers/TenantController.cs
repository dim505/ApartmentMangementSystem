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
    public class TenantController : ControllerBase
    {
        private readonly IConfiguration _config;

        public TenantController(IConfiguration config) {
            _config = config;       
        
        }


        [HttpGet]
        public IActionResult GetTenants() {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<TenantModel> tenants = new List<TenantModel>();
            using (IDbConnection db = new SqlConnection(connStr)) {

                tenants = db.Query<TenantModel>("select * from tenants").ToList();
                
            }
            return Ok(tenants);
        
        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult AddTenant([FromBody] JObject data) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            TenantModel tenant = data["tenant"].ToObject<TenantModel>();
            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"insert into tenants (Name, Email, Phone, LeaseDue, guid) values (@Name, @Email, @Phone,@LeaseDue,@guid)";
                var result = db.Execute(SqlStr, new {
                    Name = tenant.Name,
                    Email = tenant.Email,
                    Phone = tenant.Phone,
                    LeaseDue = tenant.LeaseDue,
                    guid = tenant.PropertyGuid
                });

                return Ok();
            }
           
        }

    }


   
}