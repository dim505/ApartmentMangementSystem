
using Hangfire;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
namespace AMSBackEnd.Jobs
{
    interface IMyJob
    {
        Task RunAtTimeOf(DateTime now);
    }

	//this is just a test job 
    public class MyJob : IMyJob
    {


        private readonly ILogger<MyJob> _Logger;

        public MyJob(ILogger<MyJob> logger) {

            _Logger = logger;
        }

        public async Task Run(IJobCancellationToken token)
        {
            token.ThrowIfCancellationRequested();
            await RunAtTimeOf(DateTime.Now);
        }

        public async Task RunAtTimeOf(DateTime now)
        {
            _Logger.LogInformation("My Job Starts");

            _Logger.LogInformation("My Job End");
        
        }





    }
}
