using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//controller home endpoint GetAccountDetails: used to get data to prepopulate home page with tenant data 
    public class TenantHomePage
    {
        public string tenGuid { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public string LandLordName { get; set; }
        public string LandLordEmail { get; set; }
        public string LandLordPhoneNumber { get; set; }



        public string Street { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }

    }
}
