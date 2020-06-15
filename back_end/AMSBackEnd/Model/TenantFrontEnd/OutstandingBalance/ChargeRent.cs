using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//controller payment endpoint ChargeRents -  used to contain the rent payment information to charge tenant rent 
    public class ChargeRent
    {
        public string TenGuid { get; set; }
        public decimal AmtDue { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string token { get; set; }

    }
}
