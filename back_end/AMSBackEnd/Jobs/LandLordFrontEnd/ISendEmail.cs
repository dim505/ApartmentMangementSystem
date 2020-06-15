using AMSBackEnd.Model;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AMSBackEnd.Jobs
{
    interface ISendEmail
    {
        void SendEmailAction();
    }


	//this job is responsible  for texting landlords about their expired tanants 
    public class SendEmail : ISendEmail 
    {

        private readonly IConfiguration _config;

        public SendEmail(IConfiguration config) {
            _config = config;
        }

        public void SendEmailAction() {

            var connstr = _config["ConnectionStrings:DefaultConnection"];
            var list = new List<KeyValuePair<string, string>>();

            using (IDbConnection db = new SqlConnection(connstr))
            {
				//selects all the tenants from the database 
                var tenants = db.Query<TenantLease>("select Name, LeaseDue from tenants").ToList();
                DateTime CurrDate = DateTime.Now;
				//loops through all the tenants 
                foreach (var tenant in tenants)
                {
					//calculates if lease is about to expire
                    String DateDiff = (CurrDate - DateTime.Parse(tenant.LeaseDue)).TotalDays.ToString();

                    //change to 335 to about expired leases
                    if (float.Parse(DateDiff, System.Globalization.CultureInfo.InvariantCulture) > 30)
                    {
                        System.Diagnostics.Debug.WriteLine(DateDiff);
                        list.Add(new KeyValuePair<string, string>(tenant.Name, tenant.LeaseDue));
                    }

                }

           
                 

				//builds message
                string StrList = "Peoples Lease who is about to Expire: " + string.Join("^", list);



                var apiKey = _config["SendMailApiKey"];
                var client = new SendGridClient(apiKey);
              
			  var msg = new SendGridMessage()
                {
                    From = new EmailAddress("sendemailams@gmail.com", "Email Service"),
                    Subject = "Expiring Tenants",
                    PlainTextContent = StrList,
                    HtmlContent = "<strong> " + StrList  + " </strong>"
                };
                msg.AddTo(new EmailAddress("d.komerzan@gmail.com", "Dmitriy Komerzan"));
            
				//sends email 
     			var response =  client.SendEmailAsync(msg);
 

                }


        }



    }
}
