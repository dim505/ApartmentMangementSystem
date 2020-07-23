namespace AMSBackEnd.Model
//used by TenHome controller, GetToken endpoint , gets token information from front end 

{
    public class GetToken
    {
        public string device { get; set; }

        public string TenGuid { get; set; }


    }
}
