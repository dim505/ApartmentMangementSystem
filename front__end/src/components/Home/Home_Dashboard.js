import React, { Component } from "react";
import Bounce from "react-reveal/Bounce";
import Button from '@material-ui/core/Button';


//home page 
export default class Home_Dashboard extends Component {

//redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  }

//logs user out of application 
  Logout = () => {
      this.props.auth.logout({
          returnTo: "http://localhost:3000/LogOutcallback"

      })
  }


  render() {
    return (
      <Bounce top>

      {   this.props.authenticated || window.handleRedirectCallbackAlreadyCalled === 1 ?  

              <div>       
              Click Here to Log Out           
                <Button onClick={this.Logout} variant="outlined" color="primary">
                    Log Out
                </Button>
              </div>  
                  :    
                  <div>
                  <p>Looks Like you are not logged in... If you would like to 
                    see the rest of the application, Please Log in Here </p>
                  <Button onClick={this.Login} variant="outlined" color="primary">
                       Log In
                  </Button>
            </div>  


          } 





 




        
        <p> This is where the dashboard is going to live</p>;
      </Bounce>
    );
  }
}


