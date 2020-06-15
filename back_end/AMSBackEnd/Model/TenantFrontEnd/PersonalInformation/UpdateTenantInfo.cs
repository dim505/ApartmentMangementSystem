using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//controller home endpoint UpdateTenantInfo - contains info needed to update tenant profile 
    public class UpdateTenantInfo
    {

        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

    }
}
