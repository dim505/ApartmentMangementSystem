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

                string accountSid = "AC34a616d0c4ee0ec2fcbb5e1ce9cf5f1c";

                //Environment.GetEnvironmentVariable("ENTER_ACCOUNT_SID_HERE");
                string authToken = "c2e684857b7c024095c507defe184fab";
                TwilioClient.Init(accountSid, authToken);
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
