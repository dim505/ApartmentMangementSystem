import React, { Component } from "react";
import { Formik } from "formik";
import { ContactLandLordForm } from "./ContactLandLordForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import DialogBox from "../DialogBox";

const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required"),
});

class ContactLandLord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;
    this.OpenSaveWarnBox();
    //;
  };

  Save = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var Mydata = {};
    Mydata.message = window.values;
    Mydata.message.FromEmail = this.props.results[0].email;
    Mydata.message.ToEmail = this.props.results[0].landLordEmail;

    //makes api call
    var Results = await Axios.post(
      "https://localhost:5001/api/home/ContactLandLord",
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(setTimeout(() => this.props.OpenNoti(), 1000));

    this.CloseSaveWarnBox();
    window.resetForm({});
    this.props.CloseModal();
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
    const values = { Subject: "", Message: "" };
    return (
      <React.Fragment>
        <div>
          <Paper classes={{ root: "CardHeight" }} elevation={3}>
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
              render={(props) => <ContactLandLordForm {...props} />}
            />
          </Paper>

          <DialogBox
            OpnSaveWarningBox={this.state.OpnSaveWarningBox}
            CloseSaveWarnBox={this.CloseSaveWarnBox}
            Save={this.Save}
            message="Are you sure you want to send message"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ContactLandLord;
