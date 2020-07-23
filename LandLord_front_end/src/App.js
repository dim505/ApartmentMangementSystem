import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import Tenants from "./components/Tenants/Tenants";
import AddTenants from "./components/Tenants/AddTenants";
import HomeDashboard from "./components/Home/Home_Dashboard";
import Receipt from "./components/Receipts/Receipt";
import AddReceipt from "./components/Receipts/AddReceipt";
import PropertyHomePage from "./components/Properties/PropertyHomePage";
import AddProperty from "./components/Properties/AddProperty";
import { Route } from "react-router-dom";
import Callback from "./components/LogIn/Callback";
import LogOutcallback from "./components/LogIn/LogOutcallback";
import SnackBar from "./components/shared/SnackBar";
import "./App.css";
import EditLandLordInfo from "./components/EditLandLordInfo/EditLandLordInfo";
import LandLordInfoCard from "./components/EditLandLordInfo/LandLordInfoCard";
import LandLordNews from "./components/Announcements/LandLordNews";
import AddNews from "./components/Announcements/AddNews";
import Messenger from "./components/Messenger/Messenger";
import Axios from "axios";

//root of my application
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      OpenNoti: false,
      Message: "",
      AccountDetails: [],
      ProfilePictures: [],
    };
  }

  componentDidMount() {
    //sets title in tab
    document.title = "AMS";
    //checks if user is authenticated
    this.isUserAuthenticated();

    //gets data if there is none
    if (
      this.state.AccountDetails.length <= 0 &&
      this.state.ProfilePictures.length <= 0
    ) {
      this.GetData();
    }
  }

  GetData = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    //makes api call to get account details text and sets state
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/AccountDetails/GetAccountInfo`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(async (results) => {
      await this.setState({
        AccountDetails: results.data,
      });
    });

    //makes api call to get account photo  and sets state
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/AccountDetails/GetAccountPhotoInfo`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(async (results) => {
      await this.setState({
        ProfilePictures: results.data,
      });
    });
  };
  //checks to see if user is authenticated
  async isUserAuthenticated() {
    const isLoggedIn = await this.props.auth.isAuthenticated();
    this.setState({ authenticated: isLoggedIn });
  }

  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    if (
      sessionStorage.getItem("AppLoadedOnce") !== "true" &&
      this.state.OpenNoti === false
    ) {
      sessionStorage.setItem("AppLoadedOnce", true);
      this.OpenNoti(
        "Please note only Edge and Chrome are currently supported. You might run into UI issues with other browsers. ***not mobile optimized**"
      );
    }
    return (
      <div>
        <SnackBar
          position="bottom"
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />

        <NavBar
          auth={this.props.auth}
          authenticated={this.state.authenticated}
        />
        <Route exact path="/">
          <HomeDashboard
            auth={this.props.auth}
            authenticated={this.state.authenticated}
          />
        </Route>

        <Route exact path="/Tenants">
          <Tenants auth={this.props.auth} />
        </Route>

        <Route exact path="/AddTenants">
          <AddTenants auth={this.props.auth} />
        </Route>

        <Route exact path="/Receipt">
          <Receipt auth={this.props.auth} />
        </Route>

        <Route exact path="/AddReceipt">
          <AddReceipt auth={this.props.auth} />
        </Route>

        <Route exact path="/Properties">
          <PropertyHomePage auth={this.props.auth} />
        </Route>

        <Route exact path="/AddProperty">
          <AddProperty auth={this.props.auth} />
        </Route>

        <Route exact path="/AccountDetails">
          <LandLordInfoCard
            auth={this.props.auth}
            AccountDetails={this.state.AccountDetails}
            ProfilePictures={this.state.ProfilePictures}
          />
        </Route>

        <Route exact path="/EditAccountDetails">
          <EditLandLordInfo
            auth={this.props.auth}
            AccountDetails={this.state.AccountDetails}
            ProfilePictures={this.state.ProfilePictures}
            GetData={this.GetData}
          />
        </Route>

        <Route exact path="/Announcements">
          <LandLordNews
            auth={this.props.auth}
            AccountDetails={this.state.AccountDetails}
            ProfilePictures={this.state.ProfilePictures}
          />
        </Route>

        <Route exact path="/AddNews">
          <AddNews auth={this.props.auth} />
        </Route>

        <Route exact path="/Messenger">
          <Messenger auth={this.props.auth} />
        </Route>

        <Route
          path="/callback"
          component={({ ...others }) => (
            <Callback
              auth={this.props.auth}
              history={this.props.history}
              {...others}
            />
          )}
        />

        <Route
          exact
          path="/LogOutcallback"
          component={({ ...others }) => (
            <LogOutcallback
              auth={this.props.auth}
              history={this.props.history}
              {...others}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
