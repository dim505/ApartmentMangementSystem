namespace WebApplication3.Modal
{
    //used in Announcements controller, GetNews endpoint. Gets all news for Landlord to manage
    public class GetAnnouncement
    {

        public int ID { get; set; }
        public string PropGuid { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Auth0ID { get; set; }
        public string DateAdded { get; set; }
        public string ShortSubject { get; set; }
        public string ShortMessage { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        public string ZipCode { get; set; }


    }
}
