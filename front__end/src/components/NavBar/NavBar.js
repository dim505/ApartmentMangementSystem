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

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar"      >
        <Flip left>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
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

              <NavLink
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/Tenants"
              >
                <Typography variant="h6" color="inherit">
                  <PeopleIcon style={{ fontSize: 48 }} />
                </Typography>
              </NavLink>

              <NavLink
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/Receipt"
              >
                <Typography variant="h6" color="inherit">
                  <AttachMoneyIcon style={{ fontSize: 48 }} />
                </Typography>
              </NavLink>
            </Toolbar>
          </AppBar>
        </Flip>
      </div>
    );
  }
}
