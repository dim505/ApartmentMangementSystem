using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model
{
    public class TenantModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string LeaseDue { get; set; }
        public string PropertyGuid { get; set; }
    }
}
