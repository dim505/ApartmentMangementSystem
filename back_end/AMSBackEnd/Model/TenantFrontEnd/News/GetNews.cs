using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//controller Home endpoint GetNews - gets the news related to the tenants apartment
    public class GetNews
    {
        public string Subject { get; set; }
        public string Message { get; set; }
        public string DateAdded { get; set; }

    }
}
