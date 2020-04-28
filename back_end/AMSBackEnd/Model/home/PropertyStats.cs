using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//model used to prepopulate the quickfacts card on the home page 
namespace AMSBackEnd.Model
{
    public class PropertyStats
    {
        public string NumberOfProperties { get; set; }
        public string TotalTax { get; set; }
        public string TotalInsurance { get; set; }


    }
}
