import React, { Component } from "react";
import LoopIcon from "@material-ui/icons/Loop";
import Typography from "@material-ui/core/Typography";
import PaymentPortal from "./PaymentPortal";
import Paper from "@material-ui/core/Paper";
import { StripeProvider } from "react-stripe-elements";

export default class PaymentPortalMainPage extends Component {
  render() {
    return (
      <div className="center">
        <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={10}>
          {" "}
          <Typography variant="h4" gutterBottom>
            <LoopIcon
              classes={{
                root: "MonthRentIconStyle",
              }}
              fontSize={"large"}
            />{" "}
            Monthly Rent
          </Typography>
          <Typography variant="h5" gutterBottom>
            Payment Due: <span className="RedText"> $400</span>
          </Typography>
          <StripeProvider apiKey="pk_test_zaWyvliomz572zcBnFEvreOs00ykM1wcnO">
            <PaymentPortal
              OpenNoti={this.props.OpenNoti}
              CloseModal={this.props.CloseModal}
              auth={this.props.auth}
              results={this.props.results}
            />
          </StripeProvider>
        </Paper>
      </div>
    );
  }
}
