
//used by Message controller - end point : GetTenantProfileImages gets all the profile images for the the conversation list 
namespace WebApplication3.Modal
{
    public class TenantImages
    {

        public byte[] image { get; set; }
        public string filename { get; set; }
        public string contentType { get; set; }
        public string Auth0ID { get; set; }
        public string email { get; set; }



    }
}
