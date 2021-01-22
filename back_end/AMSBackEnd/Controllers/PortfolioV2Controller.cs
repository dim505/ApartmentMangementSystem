using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AMSBackEnd.Model.TenantFrontEnd;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AMSBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioV2Controller : ControllerBase
    {




        private readonly ITokenGenerator _tokenGenerator;
        private readonly IConfiguration _config;
        public PortfolioV2Controller(IConfiguration config, ITokenGenerator tokenGenerator)
        {
            _config = config;
            _tokenGenerator = tokenGenerator;
        }


        //function used to get DB string for User 
        public string GetDbConnString()
        {

            return _config["ConnectionStrings:DefaultConnection"];

        }

        public object DbExecute(string SqlStr, object SqlParameters)
        {

            string ConnStr = GetDbConnString();
            using (IDbConnection db = new SqlConnection(ConnStr))
            {
                int result = db.Execute(SqlStr, SqlParameters);
                return Ok(result);
            }
        }

        public IActionResult DbQuery(string SqlStr, object SqlParameters)
        {
            string ConnStr = GetDbConnString();
            using (IDbConnection db = new SqlConnection(ConnStr))
            {
                System.Collections.Generic.List<dynamic> data = db.Query(SqlStr, SqlParameters).AsList();
                return Ok(data);
            }
        }



        [HttpGet]
        [Route("[action]")]
        public IActionResult GetProgInfo()
        {

            var SqlStr = @"select * from Pv2_ProjectInfo";
            var SqlParameters = new { };
            dynamic results = DbQuery(SqlStr, SqlParameters);
            return (results);
        }


        [HttpGet]
        [Route("[action]/{PageName}")]
        public IActionResult GetPageInfo(string PageName)
        {

            var SqlStr = @"select ProjectUrl as original, ProjectUrl as thumbnail, ProjectDesc as description, Pv2_ProjectInfo.ProjectGithubLink, Pv2_ProjectInfo.ProjectLiveLink from Pv2_ProjectInfo 	left join Pv2_ProjectsUrls on Pv2_ProjectInfo.ProjectPage = Pv2_ProjectsUrls.ProjectName where Pv2_ProjectInfo.ProjectPage = @PageName";
            var SqlParameters = new
            {

                PageName = new DbString
                {
                    Value = PageName,
                    IsFixedLength = false,
                    IsAnsi = true
                }



            };
            dynamic results = DbQuery(SqlStr, SqlParameters);
            return (results);
        }



        //this endpoint sends a message to the landlord from the tenant via email 
        [HttpPost]
        [Route("[action]")]
        public IActionResult ContactMe([FromBody] JObject data)
        {

            SendMessage sendMessage = data["message"].ToObject<SendMessage>();
            var apiKey = _config["SendMailApiKey"];
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("sendemailams@gmail.com", "Email Service"),
                Subject = "Portfolio Contact Email: " + sendMessage.Subject,

                HtmlContent = "<strong> Message sent from " + sendMessage.FromEmail + "</br>" + sendMessage.Message + " </strong>"
            };
            msg.AddTo(new EmailAddress("d.komerzan@gmail.com", ""));
            var response = client.SendEmailAsync(msg);
            return Ok();

        }





    }
}
