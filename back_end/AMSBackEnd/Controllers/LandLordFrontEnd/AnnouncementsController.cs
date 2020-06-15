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
using WebApplication3.Modal;


//this controller is responsible for all api end points for the announcement page on the landlord front end 
namespace AMSBackEnd.Controllers.LandLordFrontEnd
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IConfiguration _config;
        public AnnouncementsController(IConfiguration config)
        {
            _config = config;
        }

        // this end point is used to add news to the database from the add new form
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNews([FromBody] JObject data)
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
            string DateAdded = DateTime.UtcNow.ToString();
            AddAnnouncement addAnnouncement = data["Announcement"].ToObject<AddAnnouncement>();
             
            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"insert into Announcements values  (@PropGuid, @Subject, @Message, @Auth0ID, @DateAdded)";

                var result = db.Execute(SqlStr, new
                {

                    PropGuid = addAnnouncement.HouseSelect,
                    Subject = addAnnouncement.Subject,
                    Message = addAnnouncement.Message,
                    Auth0ID = LoginUserIdentifier,
                    DateAdded = DateAdded
                }

                    );



            }

            return Ok();

        }
		
		//this end point is used to update a individual news article 
        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdateNews([FromBody] JObject data)
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
            AddAnnouncement addAnnouncement = data["Announcement"].ToObject<AddAnnouncement>();

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"Update Announcements
                                set Subject = @Subject,
                                    Message = @Message
                                 where  id = @id";

                db.Execute(SqlStr, new
                {
                    Subject = addAnnouncement.Subject,
                    Message = addAnnouncement.Message,
                    id = addAnnouncement.ID,


                }

                  );



            }



            return Ok();




        }

		 //this end point used to get all the news related to the land lord so he/she can manage it 
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNews()
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
            List<GetAnnouncement> Announcements = new List<GetAnnouncement>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                  Announcements = db.Query<GetAnnouncement>("Select Annon.*, Left(Annon.Subject, 20)  as ShortSubject, Left(Annon.Message,20)  as  [ShortMessage], prop.Street, prop.City, prop.State,  prop.ZipCode from Announcements Annon inner join Properties prop on Annon.PropGuid = prop.Guid where Annon.Auth0ID = @LoginUserIdentifier  order by DateAdded",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }).ToList();
            }
            return Ok(Announcements);


        }
		//end point used to delete a new article 
        [HttpDelete]
        [Route("[action]/{id}")]
        public IActionResult DeleteNews(int id)
        {
            var connStr = _config["ConnectionStrings:DefaultConnection"];

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"delete from Announcements where id = @ID";
                var result = db.Execute(SqlStr, new
                {
                    ID = id
                });

            }
            return Ok();
        }

    }
}

