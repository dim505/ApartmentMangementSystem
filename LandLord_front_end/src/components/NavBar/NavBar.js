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
import ApartmentIcon from "@material-ui/icons/Apartment";
import Button from "@material-ui/core/Button";
import Tooltip2 from "../shared/Tooltip";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import Tooltip from "@material-ui/core/Tooltip";
import ChatIcon from "@material-ui/icons/Chat";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

//this component contains the Nav Bar
export default class NavBar extends Component {
  //redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  };
  //logs user out of application
  Logout = () => {
    this.props.auth.logout({
      returnTo: `${process.env.REACT_APP_FrontEndSiteURL}/LogOutcallback`,
    });
  };

  render() {
    const QuestIconStyle = {
      marginTop: "7px",
      fontSize: "24px",
      color: "red",
    };

    return (
      <div className="NavBar">
        <Flip left>
          <AppBar position="static">
            <Toolbar variant="dense">
              <NavLink
                exact={true}
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/"
              >
                <Typography variant="h6" color="inherit">
                  <Tooltip title="Home" placement="bottom">
                    <HomeIcon style={{ fontSize: 48 }} />
                  </Tooltip>
                </Typography>
              </NavLink>

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <NavLink
                  className="navbar__link"
                  activeClassName="navbar__link--active"
                  to="/Tenants"
                >
                  <Typography variant="h6" color="inherit">
                    <Tooltip title="Tenants" placement="bottom">
                      <PeopleIcon style={{ fontSize: 48 }} />
                    </Tooltip>
                  </Typography>
                </NavLink>
              ) : (
                <div></div>
              )}

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <NavLink
                  className="navbar__link"
                  activeClassName="navbar__link--active"
                  to="/Receipt"
                >
                  <Typography variant="h6" color="inherit">
                    <Tooltip title="Receipts" placement="bottom">
                      <AttachMoneyIcon style={{ fontSize: 48 }} />
                    </Tooltip>
                  </Typography>
                </NavLink>
              ) : (
                <div></div>
              )}

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <NavLink
                  className="navbar__link"
                  activeClassName="navbar__link--active"
                  to="/Properties"
                >
                  <Typography variant="h6" color="inherit">
                    <Tooltip title="Properties" placement="bottom">
                      <ApartmentIcon style={{ fontSize: 48 }} />
                    </Tooltip>
                  </Typography>
                </NavLink>
              ) : (
                <div></div>
              )}

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <NavLink
                  className="navbar__link"
                  activeClassName="navbar__link--active"
                  to="/AccountDetails"
                >
                  <Typography variant="h6" color="inherit">
                    <Tooltip title="Account Details" placement="bottom">
                      <AccountBoxIcon style={{ fontSize: 48 }} />
                    </Tooltip>
                  </Typography>
                </NavLink>
              ) : (
                <div></div>
              )}

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <NavLink
                  className="navbar__link"
                  activeClassName="navbar__link--active"
                  to="/Announcements"
                >
                  <Typography variant="h6" color="inherit">
                    <Tooltip title="Announcements" placement="bottom">
                      <NewReleasesIcon style={{ fontSize: 48 }} />
                    </Tooltip>
                  </Typography>
                </NavLink>
              ) : (
                <div></div>
              )}

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <NavLink
                  className="navbar__link"
                  activeClassName="navbar__link--active"
                  to="/Messenger"
                >
                  <Typography variant="h6" color="inherit">
                    <Tooltip title="Messanger" placement="bottom">
                      <ChatIcon style={{ fontSize: 48 }} />
                    </Tooltip>
                  </Typography>
                </NavLink>
              ) : (
                <div></div>
              )}

              {this.props.authenticated ||
              window.handleRedirectCallbackAlreadyCalled === 1 ? (
                <Button
                  onClick={this.Logout}
                  variant="contained"
                  color="secondary"
                >
                  Log Out
                </Button>
              ) : (
                <div>
                  <Button
                    onClick={this.Login}
                    variant="contained"
                    color="secondary"
                  >
                    Log In
                  </Button>

                  <Tooltip2
                    placement="bottom"
                    tooltip="Would you like to Log in without creating an account?
                        Please use these credentials:
                        **** Username: test@mailinator.com ****
                        **** Password: Abcd@1234 *****       
                        "
                  >
                    <LiveHelpOutlinedIcon fontSize="large" />
                  </Tooltip2>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Flip>
      </div>
    );
  }
}
