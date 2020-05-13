import React, { Component } from "react";
import { Formik } from "formik";
import { EditPersonalInfoForm } from "./EditPersonalInfoForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const validationSchema = Yup.object({
  Name: Yup.string("Enter a name").required("Name is required"),
  Email: Yup.string("Enter your email")
    .required("Email is required")
    .email("Enter a valid Email"),
  PhoneNumber: Yup.number().required("Enter your Phone Number")
});

class EditPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitValues = ({ Name, Email, PhoneNumber }) => {
    alert(Name);
    alert(Email);
    alert(PhoneNumber);
  };
  render() {
    const values = { Name: "", Email: "", PhoneNumber: "", Image: "" };
    return (
      <React.Fragment>
        <Link to="/">
          <Button
            variant="outlined"
            startIcon={<BackspaceIcon />}
          >
            BACK
          </Button>
        </Link>
        <Paper classes={{ root: "CardHeight" }} elevation={1}>


          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            Edit Personal Details
          </Typography>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={this.submitValues}
            render={props => <EditPersonalInfoForm {...props} />}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default EditPersonalInfo;
