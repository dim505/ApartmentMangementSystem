using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;


using System.Data.SqlClient;
using AMSBackEnd.Model;

namespace AMSBackEnd.Jobs
{
    interface Inter_LeaseDateSendText
    {
        void SendText();

    }



	//this job is the same as the email job, its figures out which tenants are about to expire and send a text to the land lord 
    public class LeaseDateSendText : Inter_LeaseDateSendText
    {

        private readonly IConfiguration _config;

        public LeaseDateSendText(IConfiguration config)
        {

            _config = config;
        }

        public void SendText()
        {

            var connstr = _config["ConnectionStrings:DefaultConnection"];
            var list = new List<KeyValuePair<string, string>>();

            using (IDbConnection db = new SqlConnection(connstr))
            {

                var tenants = db.Query<TenantLease>("select Name, LeaseDue from tenants").ToList();
                DateTime CurrDate = DateTime.Now;

                foreach (var tenant in tenants)
                {
                    String DateDiff = (CurrDate - DateTime.Parse(tenant.LeaseDue)).TotalDays.ToString();

                    //change to 335 to about expired leases
                    if (float.Parse(DateDiff, System.Globalization.CultureInfo.InvariantCulture) > 30)
                    {
                        System.Diagnostics.Debug.WriteLine(DateDiff);
                        list.Add(new KeyValuePair<string, string>(tenant.Name, tenant.LeaseDue));
                    }

                }

                string TwilloAccountSid = _config["TwilloAccountSid"];

                //Environment.GetEnvironmentVariable("ENTER_ACCOUNT_SID_HERE");
                string TwilloAuthToken = _config["TwilloAuthToken"];
                TwilioClient.Init(TwilloAccountSid, TwilloAuthToken);
                var to = new PhoneNumber("14134754431");

                string StrList = "Peoples Lease who is about to Expire: " + string.Join("^", list);

                var from = new PhoneNumber("14695072106");
                var message = MessageResource.Create(
                        to: to,
                        from: from,
                        body: StrList
                    );

              
            }

        }

    }
}
