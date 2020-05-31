using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{
    public class ProfilePictures
    {

        public byte[] Tenimage { get; set; }
        public string Tenfilename { get; set; }
        public string TencontentType { get; set; }
        public string TenAuth0ID { get; set; }
        public string Tenemail { get; set; }
        public byte[] Landimage { get; set; }
        public string Landfilename { get; set; }
        public string LandcontentType { get; set; }
        public string LandAuth0ID { get; set; }


 
    }
}
