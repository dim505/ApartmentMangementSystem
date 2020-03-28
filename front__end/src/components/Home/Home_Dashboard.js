import React, { Component } from "react";
import Bounce from "react-reveal/Bounce";
import Button from '@material-ui/core/Button';

export default class Home_Dashboard extends Component {

  Login = () => {
    this.props.auth.loginWithRedirect();
  }

  Logout = () => {
      this.props.auth.logout({
          returnTo: "http://localhost:3000/LogOutcallback"

      })
  }


  render() {
    return (
      <Bounce top>
        <p>Looks Like you are not logged in... Please Log in Here
        <Button onClick={this.Login} variant="outlined" color="primary">
             Log In
        </Button>

        <Button onClick={this.Logout} variant="outlined" color="primary">
             Log Out
        </Button>

        </p>
        <p> This is where the dashboard is going to live</p>;
      </Bounce>
    );
  }
}


