import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import "react-dots-loader/index.css";
import Axios from 'axios';
import Welcome from "./components/Home/Welcome";
import HomePage from "./components/Home/HomePage";
import Tooltip from "./components/Tooltip";  
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';
 
import { Route } from "react-router-dom";
 
import Snackbar from "@material-ui/core/Snackbar";
import "./App.css"


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {  
      authenticated: false,
      ShowBrowserNoti: true,
      ShowBody: false
    };
  }

  componentDidMount(){
    document.title = "AMS"
    this.isUserAuthenticated();
  }

//checks to see if user is authenticated 
  async isUserAuthenticated () {
    const isLoggedIn =  await this.props.auth.isAuthenticated();
     this.setState({ authenticated: isLoggedIn})
    setTimeout( () => this.setState({ShowBody: true}), 3000)
}


//opens browser support notitication 
OpenShowBrowserNoti = () => {
  this.setState({ ShowBrowserNoti: true })
}

//closes browser support notitication
CloseShowBrowserNoti = () => {
  this.setState({ ShowBrowserNoti: false })
}

  //redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  };


  render  () {

    if (sessionStorage.getItem('AppLoadedOnce') !== true && this.state.ShowBrowserNoti === false) {
        
        sessionStorage.setItem('AppLoadedOnce', true)

    }

    if (window.location.search.includes("code=") && window.handleRedirectCallbackAlreadyCalled !== 1) {
             
			window.handleRedirectCallbackAlreadyCalled = 1
            
			//handles success and error responses from Auth0 after a user logs in (required per Auth0 API documentation to have this )
		//	await this.props.auth.handleRedirectCallback();
    }


    return (
      <div>
          <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.ShowBrowserNoti}
          onClose={() => this.CloseShowBrowserNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Please note only Edge and Chrome are currently supported. You might run into UI issues with other browsers.</span>}
        />

{this.props.authenticated ||
        window.handleRedirectCallbackAlreadyCalled === 1 ? (
          
            <div className="CenterAlignText">


              <Fade bottom     opposite collapse  unmountOnExit when={!this.state.ShowBody}>

        
              <Fade bottom>
              <Welcome />
              </Fade>
              </Fade>

              <Fade bottom    opposite when={this.state.ShowBody}>
              <NavBar auth = {this.props.auth}
                authenticated = {this.state.authenticated}
                />
              <Route exact path="/">
                  <HomePage auth = {this.props.auth} 
                       authenticated = {this.state.authenticated}/>
               </Route>
               </Fade>

            </div>
          
        ) : (
          <Bounce top>
            <div className="Center CenterText">
              <p>
                Looks Like you are not logged in... If you would like to see the
                rest of the application, Please Log in Here{" "}
              </p>
              <Button
                 
                onClick={this.Login}
                variant="outlined"
              >
                Log In
              </Button>
              <Tooltip
                        placement="bottom"
                        tooltip="Would you like to Log in without creating an account?
                        Please use these credentials:
                        **** Username: test@mailinator.com ****
                        **** Password: Abcd@1234 *****       
                        "
                                              >
                                                
                        <LiveHelpOutlinedIcon 
                        fontSize="large"
                        />
                        
                        </Tooltip>
               

            </div>
          </Bounce>
        )}





 

      </div>
    );
  }
}

export default App;
