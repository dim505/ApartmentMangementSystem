import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import createAuth0Client from '@auth0/auth0-spa-js'



const auth0 = async () => createAuth0Client ({
  domain: "dev-5wttvoce.auth0.com",
  client_id: "xJ48BWaU5z5q31hoKaBgv7Izq7UIJAXA",
  //Redirect URL when authenication suceeds
  redirect_uri: "http://localhost:3000/callback"


})





auth0().then( auth => { 
  ReactDOM.render( 
      <BrowserRouter basename="/">
        <App auth = {auth} />
      </BrowserRouter>,
      document.getElementById("root"))

});
