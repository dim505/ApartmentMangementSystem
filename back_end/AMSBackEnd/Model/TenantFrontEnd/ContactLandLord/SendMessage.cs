﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//controller ContactLandLord endpoint: ContactLandLord - contains information needed to send a message from landlord to tenant 
    public class SendMessage
    {
        public string ToEmail { get; set; }
        public string FromEmail { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
