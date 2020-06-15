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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      ShowBrowserNoti: true,
      ShowBody: false,
      results: [],
      ProfilePictures: [],
      PaymentInfoCard: [],
      PaymentInfoHist: [],
    };
  }

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

  GetPaymentInfo = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(
      `https://localhost:5001/api/Payment/GetWhenRentDue/${this.state.results[0].email}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        PaymentInfoCard: results.data,
      })
    );

    var results2 = Axios.get(
      `https://localhost:5001/api/Payment/GetPaymentHistory/${this.state.results[0].email}`,
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
      "https://localhost:5001/api/TenHome/GetAccountDetails",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        results: results.data,
      })
    );

    var results2 = Axios.get(
      "https://localhost:5001/api/TenHome/GetProfilePhoto",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        ProfilePictures: results.data,
      })
    );
  };

  //opens browser support notitication
  OpenShowBrowserNoti = () => {
    this.setState({ ShowBrowserNoti: true });
  };

  //closes browser support notitication
  CloseShowBrowserNoti = () => {
    this.setState({ ShowBrowserNoti: false });
  };

  //redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  };

  render() {
    if (
      sessionStorage.getItem("AppLoadedOnce") !== true &&
      this.state.ShowBrowserNoti === false
    ) {
      sessionStorage.setItem("AppLoadedOnce", true);
    }

    if (
      window.location.search.includes("code=") &&
      window.handleRedirectCallbackAlreadyCalled !== 1
    ) {
      window.handleRedirectCallbackAlreadyCalled = 1;

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
            "aria-describedby": "message-id",
          }}
          message={
            <span id="message-id">
              Please note only Edge and Chrome are currently supported. You
              might run into UI issues with other browsers.
            </span>
          }
        />

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
                />
              </Route>

              <Route path="/EditPersonalInfo">
                <EditPersonalInfo
                  results={this.state.results}
                  auth={this.props.auth}
                  GetData={() => this.GetData}
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
            </Fade>
          </div>
        ) : (
          <Bounce top>
            <NotLoggedIn auth={this.props.auth} />
          </Bounce>
        )}
      </div>
    );
  }
}

export default App;
