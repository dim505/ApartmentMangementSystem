import React, { Component } from "react";
import { Formik } from "formik";
import PaymentPortalForm from "./PaymentPortalForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

import DialogBox from "../DialogBox";
import Axios from "axios";
import { Elements } from "react-stripe-elements";

class PaymentPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [{ id: 1, Address: "12 verde Drive Greenfield MA" }],
      LoadSpinner: false,
    };
  }

  submitValues = () => {
    this.OpenSaveWarnBox();
    //;
  };

  Save = async () => {
    debugger;
    this.CloseSaveWarnBox();

    this.setState({ LoadSpinner: true });
    var MyData = {};
    MyData.Payment = Window.PaymentPortalFormState;
    MyData.Payment.TenGuid = this.props.results[0].tenGuid;
    MyData.Payment.AmtDue = (
      Math.round(MyData.Payment.AmtDue * 100) / 100
    ).toFixed(2);
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes API call
    var results = Axios.post(
      "https://localhost:5001/api/Payment/ChargeRents",
      MyData,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(
      setTimeout(() => {
        this.props.GetData();
        this.props.CloseModal();
        this.props.OpenNoti("Payment Was Seucessful");
      }, 3000)
    );
  };

  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true,
    });
  };
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={3}>
            <Elements>
              <PaymentPortalForm
                LoadSpinner={this.state.LoadSpinner}
                PaymentInfoCard={this.props.PaymentInfoCard}
                OpenNoti={this.props.OpenNoti}
                OpenSaveWarnBox={this.OpenSaveWarnBox}
              />
            </Elements>
          </Paper>
        </div>

        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={this.Save}
          message="Are you sure you want to submit payment?"
        />
      </React.Fragment>
    );
  }
}

export default PaymentPortal;
