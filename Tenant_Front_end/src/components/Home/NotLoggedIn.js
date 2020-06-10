import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ErrorCode from "./ErrorCode.png";
import Tooltip from "../Tooltip";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
import Button from "@material-ui/core/Button";
import Image from "react-bootstrap/Image";

//this component is shown when the user is not logged in
export default class NotLoggedIn extends Component {
  //redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  };

  render() {
    return (
      <div className="ErrorPageStyle">
        <Typography variant="h6" gutterBottom>
          OPPS!! LOOKS LIKE YOU ARE NOT LOGGED IN
        </Typography>
        <Image src={ErrorCode} fluid />
        <Typography variant="h5" gutterBottom>
          PLEASE LOG IN HERE{" "}
          <Button onClick={this.Login} variant="outlined">
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
            <LiveHelpOutlinedIcon fontSize="large" />
          </Tooltip>
        </Typography>
      </div>
    );
  }
}
