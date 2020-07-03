import React, { Component } from "react";
import { Formik } from "formik";
import PaymentPortalForm from "./PaymentPortalForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

import DialogBox from "../Shared/DialogBox";
import Axios from "axios";
import { Elements } from "react-stripe-elements";

//this parent component houses the textfield forms for the parent portal/makes api call
class PaymentPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [{ id: 1, Address: "12 verde Drive Greenfield MA" }],
      LoadSpinner: false,
    };
  }
  //open warning dialog box
  submitValues = () => {
    this.OpenSaveWarnBox();
    //;
  };
  //if yes continues to make the API call
  Save = async () => {
    debugger;
    //closes warning dialog box
    this.CloseSaveWarnBox();
    //loader starts spinner incase the transaction takes a long time
    this.setState({ LoadSpinner: true });
    //builds out object
    var MyData = {};
    MyData.Payment = Window.PaymentPortalFormState;
    MyData.Payment.TenGuid = this.props.results[0].tenGuid;
    MyData.Payment.AmtDue = (
      Math.round(MyData.Payment.AmtDue * 100) / 100
    ).toFixed(2);
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes API call
    var results = Axios.post(
      `${process.env.REACT_APP_BackEndUrl}/api/Payment/ChargeRents`,
      MyData,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(
      //give time to update record before reseting everything
      setTimeout(() => {
        this.props.GetData();
        this.props.CloseModal();
        this.props.OpenNoti("Payment Was Successful");
      }, 3000)
    );
  };

  //opens warning dialog box
  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true,
    });
  };
  //closes warning dialog box
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
