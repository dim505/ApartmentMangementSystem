
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using WebApplication3.Modal;

namespace AMSBackEnd.Controllers.LandLordFrontEnd
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {


        private readonly IConfiguration _config;

        public MessageController(IConfiguration config)
        {
            _config = config;
        }



        // gets profile images for conversation list s
        [HttpGet]
        [Route("[action]/{email}")]
        public IActionResult GetTenantProfileImages(string email)
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


            List<TenantImages> tenantImages = new List<TenantImages>();


            using (IDbConnection db = new SqlConnection(connStr))
            {
                tenantImages = db.Query<TenantImages>("declare @EmailTable table (emails varchar(max)) insert into @EmailTable		SELECT  *  FROM dbo.fnSplit(@Emails,',')  select  * from TenantImage  where email in (select emails from @EmailTable)",
                  new { emails = new DbString { Value = email, IsFixedLength = false, IsAnsi = true } }).ToList();
            }
            return Ok(tenantImages);



        }



        //gets the tenant information to build out conversation list
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetTenantsInfo()
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
            List<TenantInfo> tenantInfo = new List<TenantInfo>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                tenantInfo = db.Query<TenantInfo>("select tenGuid, ten.Name, ten.Email, Ten.TenAuth0ID, ten.LandLordAuth0ID, '' as photo, prop.Street + ' ' + prop.City + ', ' + prop.State + ' ' + prop.ZipCode as Address from LandLordAccountDetails LL_Acc_Deet inner join Properties prop on LL_Acc_Deet.Auth0ID = prop.Auth0ID inner join tenants ten on prop.Guid = ten.guid where LL_Acc_Deet.Auth0ID = @LoginUserIdentifier",
                  new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }).ToList();
            }
            return Ok(tenantInfo);


        }
    }
}
