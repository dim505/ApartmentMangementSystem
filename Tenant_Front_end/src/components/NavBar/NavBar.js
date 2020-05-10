import React, { Component } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Flip from "react-reveal/Flip";
import ApartmentIcon from '@material-ui/icons/Apartment';
import Button from '@material-ui/core/Button';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}





export default class NavBar extends Component {

//redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  }
  //logs user out of application 
  Logout = () => {
      this.props.auth.logout({
          returnTo: "https://amstenantfrontend.azurewebsites.net"
  
      })
  }

  render() {

    const QuestIconStyle = {
      marginTop: "7px",
      fontSize: "24px",
      color:"red"


    }

    


    return (
      <div className="NavBar"      >
        <Flip left>
          <AppBar color="transparent" position="static">
            <Toolbar variant="dense">

              <NavLink
                exact={true}
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/"
              >
                <Typography variant="h6" color="inherit">
                  <HomeIcon style={{ fontSize: 48 }} />
                </Typography>
              </NavLink>

 

 
		  
   

              {   this.props.authenticated || window.handleRedirectCallbackAlreadyCalled === 1 ?                  
              
              <Button
              variant="outlined"
              onClick={this.Logout}
            >
                                      Log Out

            </Button>  
 
                  :   
                  
                  
                  <div>    
                  <Button onClick={this.Login} 
                      variant="outlined"              >
                       Log In
                   </Button>    
        

        
        
                  </div>          
          }    






            </Toolbar>
          </AppBar>
        </Flip>
      </div>
    );
  }
}
