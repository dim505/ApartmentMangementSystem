import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { EditPersonalInfoForm } from "./EditPersonalInfoForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import SnackBar from "../Shared/SnackBar";
import DialogBox from "../Shared/DialogBox";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { post } from "axios";
import Fade from "react-reveal/Fade";

//object used to validate forms
const validationSchema = Yup.object({
  Name: Yup.string("Enter a name").required("Name is required"),
  Email: Yup.string("Enter your email")
    .required("Email is required")
    .email("Enter a valid Email"),
  PhoneNumber: Yup.string().required("Enter your Phone Number").min(16),
});

//parent component contains a form that is used to update the tenants information
class EditPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenNoti: false,
      Message: "",
      Image: "",
    };
  }

  //function that handles intial click of submit button
  submitValues = (values, { resetForm }) => {
    window.values = values;
    //gets function to reset form
    window.resetForm = resetForm;
    //opens warning dialog box
    this.OpenSaveWarnBox();
    //;
  };
  //function that does the actual submit of data if user presses yes
  Save = async () => {
    //gets auth token
    const BearerToken = await this.props.auth.getTokenSilently();
    //closes warning box
    this.CloseSaveWarnBox();
    //resets form
    window.resetForm({});
    //Builds out object to send to back end
    var Mydata = {};
    Mydata.tenant = window.values;

    //checks to see if an image was uploaded then makes api call to upload image
    if (window.values.file !== "" && window.TenantPicture !== undefined) {
      const AddImageUrl = `${process.env.REACT_APP_BackEndUrl}/api/Tenhome/AddTenantImage/${window.values.Email}`;
      const formData = new FormData();
      formData.append("body", window.TenantPicture);
      const config = {
        headers: {
          Authorization: `bearer ${BearerToken}`,
          "content-type": "multipart/form-data",
        },
      };
      //makes API call to update image
      var results = await post(AddImageUrl, formData, config);
    }

    //makes api call
    var Results = await Axios.post(
      `${process.env.REACT_APP_BackEndUrl}/api/Tenhome/UpdateTenantInfo`,
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(this.OpenNoti(), this.SetMessage("Update was sucessful"));
  };

  //closes warning box
  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true,
    });
  };

  //opens warningbox
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  //opens notification
  OpenNoti = () => {
    debugger;
    this.props.GetData();
    this.setState({
      OpenNoti: true,
    });
  };

  //sets message for notification
  SetMessage = (message) => {
    this.setState({
      Message: message,
    });
  };

  //closes notification
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };
  render() {
    //clears default values for the form
    const values = {
      Name: this.props.results[0].name,
      Email: this.props.results[0].email,
      PhoneNumber: this.props.results[0].phone,
      file:
        this.props.ProfilePictures.length > 0
          ? this.props.ProfilePictures[0].tenfilename
          : "",
    };
    return (
      <React.Fragment>
        <Fade top>
          <Link to="/">
            <Button variant="outlined" startIcon={<BackspaceIcon />}>
              BACK
            </Button>
          </Link>

          <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={1}>
            <Typography
              classes={{ root: "CardTitle" }}
              variant="h5"
              component="h2"
            >
              Edit Personal Details
            </Typography>
            <Formik
              enableReinitialize={true}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
              render={(props) => (
                <EditPersonalInfoForm
                  ProfilePictures={this.props.ProfilePictures}
                  OpenNoti={this.OpenNoti}
                  SetMessage={this.SetMessage}
                  {...props}
                />
              )}
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
            message="Are you sure you want to save?"
          />
        </Fade>
      </React.Fragment>
    );
  }
}

export default EditPersonalInfo;
