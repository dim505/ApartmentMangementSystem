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
            List<TenantMainPageModel> tenants = new List<TenantMainPageModel>();
            using (IDbConnection db = new SqlConnection(connStr)) {

                var SqlStr = @"select * from tenants";
                tenants = db.Query<TenantMainPageModel>(SqlStr).ToList();

                /*
                select prop.street, prop.city, prop.state, prop.guid,
                                    ten.Name, ten.Phone, ten.Email, ten.LeaseDue
                                    from Properties prop
                                    inner join tenants ten
                                    on prop.Guid = ten.guid*/
            }
            return Ok(tenants);
        
        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdateTenant([FromBody] JObject data) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            UpdateTenantModel updateTenant = data["tenant"].ToObject<UpdateTenantModel>();
            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"update tenants 
	                                set Name = @Name,
		                                Email = @Email,
		                                Phone = @Phone,
		                                LeaseDue = @LeaseDue
	                          where tenGuid = @tenGuid ";
                var result = db.Execute(SqlStr, new
                {
                    Name = updateTenant.name,
                    Email = updateTenant.email,
                    Phone = updateTenant.phone,
                    LeaseDue = updateTenant.leaseDue,
                    tenGuid = updateTenant.tenGuid
                 });

                return Ok();
            }        
        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult AddTenant([FromBody] JObject data) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            TenantModel tenant = data["tenant"].ToObject<TenantModel>();
            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"insert into tenants (Name, Email, Phone, LeaseDue, guid, tenGuid) values (@Name, @Email, @Phone,@LeaseDue,@guid,@tenGuid)";
                var result = db.Execute(SqlStr, new {
                    Name = tenant.Name,
                    Email = tenant.Email,
                    Phone = tenant.Phone,
                    LeaseDue = tenant.LeaseDue,
                    guid = tenant.PropertyGuid,
                    tenGuid = tenant.tenGuid
                });

                return Ok();
            }
           
        }



        [HttpDelete]
        [Route("delete/{guid}")]
        public IActionResult DeleteTenant(string guid) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = "delete from tenants where tenGuid=@guid";
                var result = db.Execute(SqlStr, new
                {

                    guid = guid
                });

                return Ok();

            
            
            }
        
        
        }

    }


   
}