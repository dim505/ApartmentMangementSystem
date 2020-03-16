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
import "./App.css"
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount(){
    document.title = "AMS"
  }


  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/">
          <HomeDashboard />
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


      </div>
    );
  }
}

export default App;
