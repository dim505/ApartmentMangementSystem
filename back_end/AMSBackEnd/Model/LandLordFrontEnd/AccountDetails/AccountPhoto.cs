namespace AMSBackEnd.Model.LandLordFrontEnd.AccountDetails
{
    //used in AccountDetails controller, GetAccountPhotoInfo endpoint to get the landlord profile photo
    public class AccountPhoto
    {
        public byte[] image { get; set; }
        public string filename { get; set; }
        public string contentType { get; set; }
        public string Auth0ID { get; set; }



    }
}
