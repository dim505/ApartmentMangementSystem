using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//this model is used to prepopulate the main property page with all the necessary information 
namespace AMSBackEnd.Model
{
    public class PropertyModel
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Unit { get; set; }
        public string YearlyInsurance { get; set; }
        public string Tax { get; set; }
        public string Guid { get; set; }
        public string ZipCode { get; set; }
    }
}
