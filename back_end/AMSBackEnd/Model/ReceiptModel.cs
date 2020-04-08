using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//this model is used to prepopulate the main receipt page with all the necessary information 
namespace AMSBackEnd.Model
{
    public class ReceiptModel
    {


        public string id { get; set; }
        public string Date { get; set; }
        public string Store { get; set; }
        public string Tax { get; set; }
        public string TotalAmount { get; set; }
        public string ImageGuid { get; set; }
        public string Guid { get; set; }
        public byte[] image { get; set; }
        public string filename { get; set; }
        public string contentType { get; set; }
        public string ImageUrl { get; set; }
        public string Auth0ID { get; set; }

        

    }
}
