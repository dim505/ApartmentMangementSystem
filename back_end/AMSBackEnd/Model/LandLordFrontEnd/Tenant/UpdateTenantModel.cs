//used in the UpdateTenant action method to update a tenants information 
namespace AMSBackEnd.Model
{
    public class UpdateTenantModel
    {
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string leaseDue { get; set; }
        public string guid { get; set; }
        public string rentDue { get; set; }
        public string tenGuid { get; set; }

    }
}
