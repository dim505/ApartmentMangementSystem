
namespace AMSBackEnd.Model.LandLordFrontEnd.Tenant
{
    // Controller: tenant, Endpoint: AddTenant checks if there is any duplicate emails in the database for tenants 
    public class TenantCheckEmail
    {
        public string Email { get; set; }

        public string EmailCount { get; set; }

    }
}
