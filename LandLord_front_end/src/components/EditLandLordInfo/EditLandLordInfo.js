import React, { Component, cloneElement } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { EditLandLordInfoForm } from "./EditLandLordInfoForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import SnackBar from "../SnackBar";
import DialogBox from "../DialogBox";

const validationSchema = Yup.object({
  Name: Yup.string("Enter a name").required("Name is required"),
  Email: Yup.string("Enter your email")
    .required("Email is required")
    .email("Enter a valid Email"),
  PhoneNumber: Yup.number().required("Enter your Phone Number")
});

class EditLandLordInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenNoti: false,
      Message: "",
      Name: "Bill",
      Email: "bob@bob.com",
      PhoneNumber: "4134754431",
      Image: ""
    };
  }

  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;
    console.log(window.LandLordPicture);
    this.OpenSaveWarnBox();
    //;
  };

  Save = () => {
    this.CloseSaveWarnBox();
    window.resetForm({});
    this.SetMessage("Personal Details Have successfully been saved")
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
    debugger
    this.setState({
      OpenNoti: true,
      
    });
  };

  SetMessage =  (message) => {
   this.setState({
      Message: message,
    });
    
  } 
  CloseNoti = () => {
    this.setState({
      OpenNoti: false
    });
  };

  render() {
    const values = {
      Name: this.state.Name,
      Email: this.state.Email,
      PhoneNumber: this.state.PhoneNumber,
      file: ""
    };
    return (
      <React.Fragment>
        <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={1}>
          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            Edit Land Lord Details
          </Typography>
          <Formik
            initialValues={values}
            onSubmit={this.submitValues}
            validationSchema={validationSchema}
            render={props => <EditLandLordInfoForm 
            OpenNoti = {this.OpenNoti}
            SetMessage = {this.SetMessage}
            {...props} />}
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
          message="Are you Sure you want to save?"
        />
      </React.Fragment>
    );
  }
}

export default EditLandLordInfo;
