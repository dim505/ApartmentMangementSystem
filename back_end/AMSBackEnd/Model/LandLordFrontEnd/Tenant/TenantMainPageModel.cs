using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//used in the GetTenants action method to get all the tenants to prepopulate the main page of tenants 
namespace AMSBackEnd.Model
{
    public class TenantMainPageModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string LeaseDue { get; set; }
        public string guid { get; set; }
       
        public string tenGuid { get; set; }
        public string Auth0ID { get; set; }

        public string RentDueEaMon { get; set; }


    }
}
