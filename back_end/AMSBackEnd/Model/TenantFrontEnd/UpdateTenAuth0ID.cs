using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//used by endpoint TenHome/GetAccountDetails, checks to see if TenAuth0ID field is empty
    public class UpdateTenAuth0ID
    {
        public string IsAuth0IDNull { get; set; }
    }
}
