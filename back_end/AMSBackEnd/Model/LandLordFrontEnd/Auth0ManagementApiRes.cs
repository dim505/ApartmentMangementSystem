using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.LandLordFrontEnd
{
    public class Auth0ManagementApiRes
    {
        public static string _access_token;
        public static string _expires_in;
        public static string _scope;
        public static string _token_type;
       
        public static string access_token
        {

            get
            {
                return _access_token;

            }

            set 
            { _access_token = value; }
        
        }

        public static string expires_in
        {

            get
            {
                return _expires_in;

            }

            set
            { _expires_in = value; }

        }

        public static string scope
        {

            get
            {
                return _scope;

            }

            set
            { _scope = value; }

        }

        public static string token_type
        {

            get
            {
                return _token_type;

            }

            set
            { _token_type = value; }

        }

    }
}
