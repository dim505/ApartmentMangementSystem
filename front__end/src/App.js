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
import Snackbar from "@material-ui/core/Snackbar";
import "./App.css"
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {  
      authenticated: false,
      ShowBrowserNoti: false
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

OpenShowBrowserNoti = () => {
  this.setState({ ShowBrowserNoti: true })
}

CloseShowBrowserNoti = () => {
  this.setState({ ShowBrowserNoti: false })
}


  render  () {

    if (sessionStorage.getItem('AppLoadedOnce') !== true && this.state.ShowBrowserNoti === false) {
        
        sessionStorage.setItem('AppLoadedOnce', true)
        


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

        <NavBar auth = {this.props.auth}
                authenticated = {this.state.authenticated}
        />
        <Route exact path="/">
          <HomeDashboard auth = {this.props.auth} 
          authenticated = {this.state.authenticated}/>
        </Route>

        <Route exact path="/Tenants">
          <Tenants auth = {this.props.auth}/>
        </Route>

        <Route exact path="/AddTenants">
          <AddTenants auth = {this.props.auth}/>
        </Route>


        <Route exact path="/Receipt">
          <Receipt auth = {this.props.auth}/>
        </Route>

        <Route exact path="/AddReceipt">
          <AddReceipt auth = {this.props.auth}/>
        </Route>

        <Route exact path="/Properties">
          <PropertyHomePage 
          auth = {this.props.auth} />
        </Route>

        <Route exact path="/AddProperty">
          <AddProperty  auth = {this.props.auth}/>
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
