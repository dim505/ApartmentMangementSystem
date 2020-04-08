using Hangfire;
using Hangfire.Common;
using System;
using AMSBackEnd.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Security.Claims;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

using Hangfire.SqlServer;


namespace AMSBackEnd.Jobs
{
    public class HangFireJobSchduler
    {

        public static void SchduleReOccuringJobs()
        {

            RecurringJob.RemoveIfExists(nameof(MyJob));
            RecurringJob.AddOrUpdate<MyJob>(nameof(MyJob),
            job => job.Run(JobCancellationToken.Null),
            Cron.Daily(5, 00), TimeZoneInfo.Local);


            RecurringJob.RemoveIfExists(nameof(LeaseDateSendText));
            RecurringJob.AddOrUpdate<Inter_LeaseDateSendText>(
                 LeaseDateSendText => LeaseDateSendText.SendText(), Cron.Daily);

        }





    }
}
