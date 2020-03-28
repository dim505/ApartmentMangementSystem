import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import Tenants from "./components/Tenants/Tenants";
import AddTenants from "./components/Tenants/AddTenants";
import HomeDashboard from "./components/Home/Home_Dashboard";
import Receipt from "./components/Receipts/Receipt";
import AddReceipt from "./components/Receipts/AddReceipt";
import PropertyHomePage from './components/Properties/PropertyHomePage'
import AddProperty from './components/Properties/AddProperty'
import { Route } from "react-router-dom";
import Callback from './components/LogIn/Callback'
import LogOutcallback from './components/LogIn/LogOutcallback'
import "./App.css"
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {  
      authenticated: false
    };
  }

  componentDidMount(){
    document.title = "AMS"
    this.isUserAuthenticated();
  }


  async isUserAuthenticated () {
    const isLoggedIn =  await this.props.auth.isAuthenticated();
     this.setState({ authenticated: isLoggedIn})
}


  render() {
    return (
      <div>
        <NavBar auth = {this.props.auth}
                authenticated = {this.state.authenticated}
        />
        <Route exact path="/">
          <HomeDashboard auth = {this.props.auth} />
        </Route>

        <Route exact path="/Tenants">
          <Tenants />
        </Route>

        <Route exact path="/AddTenants">
          <AddTenants />
        </Route>


        <Route exact path="/Receipt">
          <Receipt />
        </Route>

        <Route exact path="/AddReceipt">
          <AddReceipt />
        </Route>

        <Route exact path="/Properties">
          <PropertyHomePage />
        </Route>

        <Route exact path="/AddProperty">
          <AddProperty />
        </Route>

        <Route  path="/callback" component={({...others}) =>
                      <Callback auth = {this.props.auth}
                      history={this.props.history} {...others} />
      
      
      
      }/>

     



        <Route exact path="/LogOutcallback" component={({...others}) =>
          <LogOutcallback auth = {this.props.auth} 
            history = {this.props.history} {...others}
          />
        }/>


      </div>
    );
  }
}

export default App;
