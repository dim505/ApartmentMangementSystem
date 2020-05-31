import React, { Component } from "react";
import { Formik } from "formik";
import { ContactLandLordForm } from "./ContactLandLordForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import SnackBar from "./SnackBar";
import DialogBox from "./DialogBox";
const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required")
});

class ContactLandLord extends Component {
  constructor(props) {
    super(props);
    this.state = { OpenNoti: false, Message: "", OpnSaveWarningBox: false };
  }

  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;
    this.OpenSaveWarnBox();
    //;
  };

  Save = () => {
    this.CloseSaveWarnBox();
    window.resetForm({});
    this.OpenNoti();
  };

  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true
    });
  };
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false
    });
  };

  OpenNoti = () => {
    this.setState({ OpenNoti: true, Message: "Message was successfully sent" });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false
    });
  };

  render() {
    const values = { Subject: "", Message: "" };
    return (
      <React.Fragment>
        <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={3}>
          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            Contact Land Lord
          </Typography>
          <Formik
            initialValues={values}
            onSubmit={this.submitValues}
            validationSchema={validationSchema}
            render={props => <ContactLandLordForm {...props} />}
          />
        </Paper>

        <SnackBar
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />
        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={this.Save}
          message="Are you sure you want to send message"
        />
      </React.Fragment>
    );
  }
}

export default ContactLandLord;
