//this model is used to prepopulate the main tenant page with all the necessary information 
namespace AMSBackEnd.Model
{
    public class TenantModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string LeaseDue { get; set; }
        public string RentDue { get; set; }
        public string PropertyGuid { get; set; }
        public string tenGuid { get; set; }


    }
}
