import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { CardElement, injectStripe } from "react-stripe-elements";

class PaymentPortalFormSubmit extends Component {
  render() {
    return <div />;
  }
}

//creates a stripe HOC
export default injectStripe(PaymentPortalFormSubmit);
