import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import "react-dots-loader/index.css";
import Axios from "axios";
import Welcome from "./components/Home/Welcome";
import HomePage from "./components/Home/HomePage";
import PaymentPortalMainPage from "./components/PaymentHistory/PaymentPortalMainPage";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import EditPersonalInfo from "./components/PersonalInfo/EditPersonalInfo";
import { Route } from "react-router-dom";
import NotLoggedIn from "./components/Home/NotLoggedIn";
import Snackbar from "@material-ui/core/Snackbar";
import "./App.css";
import PaymentPortal from "./components/PaymentHistory/PaymentPortal";
import SnackBar from "./components/Shared/SnackBar";
import TenChat from "./components/TenantChat/TenChat";
import "react-chat-widget/lib/styles.css";

//gets app data upon load
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      OpenNoti: true,
      ShowBody: false,
      results: [],
      ProfilePictures: [],
      PaymentInfoCard: [],
      PaymentInfoHist: [],
      Message:
        "Please note only Edge and Chrome are currently supported. You might run into UI issues with other browsers.",
    };
  }

  //sets title, get data, check if visiting user is authenticated
  componentDidMount() {
    document.title = "AMS";
    this.isUserAuthenticated();
    this.GetData();
  }
  componentDidUpdate() {
    if (
      this.state.results.length > 0 &&
      this.state.PaymentInfoCard.length <= 0
    ) {
      this.GetPaymentInfo();
    }
  }

  //gets payment due now and payment history data
  GetPaymentInfo = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/Payment/GetWhenRentDue/${this.state.results[0].email}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        PaymentInfoCard: results.data,
      })
    );

    var results2 = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/Payment/GetPaymentHistory/${this.state.results[0].email}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        PaymentInfoHist: results.data,
      })
    );
  };

  //checks to see if user is authenticated
  async isUserAuthenticated() {
    const isLoggedIn = await this.props.auth.isAuthenticated();
    this.setState({ authenticated: isLoggedIn });
    setTimeout(() => this.setState({ ShowBody: true }), 3000);
  }

  GetData = async () => {
    //makes api call and sets state

    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/TenHome/GetAccountDetails`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        results: results.data,
      })
    );
    //makes 2nd api call to get profile photos
    var results2 = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/TenHome/GetProfilePhoto`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        ProfilePictures: results.data,
      })
    );
  };

  //redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  };

  //function open alert notification
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };
  //function closes alert notification
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    //checks to see if user logged in and sets flag to show so
    if (
      window.location.search.includes("code=") &&
      window.handleRedirectCallbackAlreadyCalled !== 1
    ) {
      window.handleRedirectCallbackAlreadyCalled = 1;
    }

    return (
      <div>
        {this.props.authenticated ||
        window.handleRedirectCallbackAlreadyCalled === 1 ? (
          <div className="CenterAlignText">
            <Fade
              bottom
              opposite
              collapse
              unmountOnExit
              when={!this.state.ShowBody}
            >
              <Fade bottom>
                <Welcome />
              </Fade>
            </Fade>

            <Fade bottom opposite when={this.state.ShowBody}>
              <NavBar
                auth={this.props.auth}
                authenticated={this.state.authenticated}
              />
              <Route exact path="/">
                <HomePage
                  results={this.state.results}
                  auth={this.props.auth}
                  authenticated={this.state.authenticated}
                  ProfilePictures={this.state.ProfilePictures}
                  PaymentInfoCard={this.state.PaymentInfoCard}
                  GetData={this.GetData}
                  GetPaymentInfo={this.GetPaymentInfo}
                />
              </Route>

              <Route path="/EditPersonalInfo">
                <EditPersonalInfo
                  results={this.state.results}
                  auth={this.props.auth}
                  GetData={this.GetData}
                  ProfilePictures={this.state.ProfilePictures}
                />
              </Route>
              <Route path="/PaymentHistory">
                <PaymentHistory
                  auth={this.props.auth}
                  results={this.state.results}
                  PaymentInfoCard={this.state.PaymentInfoCard}
                  PaymentInfoHist={this.state.PaymentInfoHist}
                  GetPaymentInfo={this.GetPaymentInfo}
                />
              </Route>
              <TenChat auth={this.props.auth} results={this.state.results} />
            </Fade>
          </div>
        ) : (
          <div>
            <Bounce top>
              <NotLoggedIn auth={this.props.auth} />
            </Bounce>

            <SnackBar
              OpenNoti={this.state.OpenNoti}
              CloseNoti={this.CloseNoti}
              message={this.state.Message}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
