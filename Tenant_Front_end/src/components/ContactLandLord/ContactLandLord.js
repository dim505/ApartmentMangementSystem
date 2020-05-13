import React, { Component } from "react";
import { Formik } from "formik";
import { ContactLandLordForm } from "./ContactLandLordForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";

const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required")
});

class ContactLandLord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitValues = ({ Subject, Message }) => {
    alert(Subject);
    alert(Message);
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
              render={props => <ContactLandLordForm {...props} />}
            />
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactLandLord;
