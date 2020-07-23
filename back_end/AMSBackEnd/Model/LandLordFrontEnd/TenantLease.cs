//model used by the hangfire scheduled task send text to get all tenants and when their lease is due
namespace AMSBackEnd.Model
{
    public class TenantLease
    {

        public string Name { get; set; }
        public string LeaseDue { get; set; }


    }
}
