﻿using AMSBackEnd.Model;
using AMSBackEnd.Model.LandLordFrontEnd.Tenant;
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
using Microsoft.AspNetCore.Authorization;



//TenantController is responsible for all action methods related to the tenant page 
namespace AMSBackEnd.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class TenantController : ControllerBase
    {
        private readonly IConfiguration _config;

        public TenantController(IConfiguration config)
        {
            _config = config;

        }

        //gets all tenants from the database
        [HttpGet]
        public IActionResult GetTenants()
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
            List<TenantMainPageModel> tenants = new List<TenantMainPageModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {

                var SqlStr = @"select * from tenants where LandLordAuth0ID = @LoginUserIdentifier";
                tenants = db.Query<TenantMainPageModel>(SqlStr, new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }).ToList();



            }
            return Ok(tenants);

        }

        //updates a tenant in the database 
        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdateTenant([FromBody] JObject data)
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
            UpdateTenantModel updateTenant = data["tenant"].ToObject<UpdateTenantModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"update tenants 
	                                set Name = @Name,
		                                Email = @Email,
		                                Phone = @Phone,
		                                LeaseDue = @LeaseDue,
                                        RentDueEaMon = @RentDue
	                          where tenGuid = @tenGuid and LandLordAuth0ID = @LoginUserIdentifier ";
                var result = db.Execute(SqlStr, new
                {
                    Name = updateTenant.name,
                    Email = updateTenant.email,
                    Phone = updateTenant.phone,
                    LeaseDue = updateTenant.leaseDue,
                    tenGuid = updateTenant.tenGuid,
                    RentDue = updateTenant.rentDue,
                    LoginUserIdentifier = LoginUserIdentifier
                });

                return Ok();
            }
        }




        //adds a tenant to the database
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddTenant([FromBody] JObject data)
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
            string DateAdded = DateTime.UtcNow.ToString("yyyy-MM-dd");
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            TenantModel tenant = data["tenant"].ToObject<TenantModel>();

            List<TenantCheckEmail> tenantCheckEmails = new List<TenantCheckEmail>();


            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"select distinct Email, count(email) as EmailCount  from tenants
                            where Email = RTRIM(LTRIM(@Email))
                            group by email";
                tenantCheckEmails = db.Query<TenantCheckEmail>(SqlStr,
                    new
                    {
                        Email = new DbString { Value = tenant.Email, IsFixedLength = false, IsAnsi = true }
                    }
                    ).ToList();
            }


            if (tenantCheckEmails.Count >= 1)
            {
                return NotFound("duplicate email");
            }
            else
            {
                using (IDbConnection db2 = new SqlConnection(connStr))
                {
                    var SqlStr = @"insert into tenants (Name, Email, 
                Phone, LeaseDue, guid, tenGuid,LandLordAuth0ID,DateAdded,RentDueEaMon, TenAuth0ID) 
                values (@Name, @Email, @Phone,@LeaseDue,@guid,@tenGuid,@LoginUserIdentifier,@DateAdded, @RentDueEaMon,@TenAuth0ID)";
                    var result = db2.Execute(SqlStr, new
                    {
                        Name = tenant.Name,
                        Email = tenant.Email,
                        Phone = tenant.Phone,
                        LeaseDue = tenant.LeaseDue,
                        guid = tenant.PropertyGuid,
                        tenGuid = tenant.tenGuid,
                        LoginUserIdentifier = LoginUserIdentifier,
                        RentDueEaMon = tenant.RentDue,
                        DateAdded = DateAdded,
                        TenAuth0ID = ""

                    });

                    return Ok();

                }


            }


        }



        [HttpDelete]
        //deletes a specified tenant from the database
        [Route("delete/{guid}")]
        public IActionResult DeleteTenant(string guid)
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
            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = "delete from tenants where tenGuid=@guid and LandLordAuth0ID = @LoginUserIdentifier";
                var result = db.Execute(SqlStr, new
                {

                    guid = guid,
                    LoginUserIdentifier = LoginUserIdentifier
                });

                return Ok();



            }


        }

    }



}