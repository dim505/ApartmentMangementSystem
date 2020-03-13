using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//this model is used to represent the data to update a receipt coming from the update receipt modal
namespace AMSBackEnd.Model
{
    public class UpdateReceipt
    {
        public string date { get; set; }
        public string id { get; set; }
        public string store { get; set; }
        public string tax { get; set; }
        public string totalAmount { get; set; }



    }
}
