import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Tenants from "./components/Tenants";
import HomeDashboard from "./components/Home_Dashboard";
import Receipt from "./components/Receipt";
import AddReceipt from "./components/AddReceipt";
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

        <Route exact path="/Receipt">
          <Receipt />
        </Route>

        <Route exact path="/AddReceipt">
          <AddReceipt />
        </Route>

      </div>
    );
  }
}

export default App;
