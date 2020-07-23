namespace AMSBackEnd.Model.LandLordFrontEnd
{

    //obsolete code 
    public class Auth0ManagementApiRes
    {
        public static string _access_token;
        public static string _expires_in;
        public static string _scope;
        public static string _token_type;

        public static string access_token
        {

            get => _access_token;

            set => _access_token = value;

        }

        public static string expires_in
        {

            get => _expires_in;

            set => _expires_in = value;

        }

        public static string scope
        {

            get => _scope;

            set => _scope = value;

        }

        public static string token_type
        {

            get => _token_type;

            set => _token_type = value;

        }

    }
}
