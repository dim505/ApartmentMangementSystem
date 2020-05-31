using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.LandLordFrontEnd.AccountDetails
{
    public class AccountPhoto
    {
        public byte[] image { get; set; }
        public string  filename { get; set; }
        public string contentType { get; set; }
        public string Auth0ID { get; set; }



    }
}
