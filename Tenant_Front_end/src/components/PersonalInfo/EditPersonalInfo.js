import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { EditPersonalInfoForm } from "./EditPersonalInfoForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import SnackBar from "../SnackBar";
import DialogBox from "../DialogBox";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { post } from "axios";
import Fade from "react-reveal/Fade";

const validationSchema = Yup.object({
  Name: Yup.string("Enter a name").required("Name is required"),
  Email: Yup.string("Enter your email")
    .required("Email is required")
    .email("Enter a valid Email"),
  PhoneNumber: Yup.number().required("Enter your Phone Number"),
});

class EditPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenNoti: false,
      Message: "",
      Image: "",
    };
  }

  submitValues = (values, { resetForm }) => {
    console.log(window.LandLordPicture);
    window.values = values;
    window.resetForm = resetForm;
    this.OpenSaveWarnBox();
    //;
  };

  Save = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    this.CloseSaveWarnBox();
    window.resetForm({});
    var Mydata = {};
    Mydata.tenant = window.values;

    if (window.values.file !== "" && window.TenantPicture !== undefined) {
      console.log(window.values);
      const AddImageUrl = `https://amsbackend.azurewebsites.net/api/home/AddTenantImage/${window.values.Email}`;
      const formData = new FormData();
      formData.append("body", window.TenantPicture);
      const config = {
        headers: {
          Authorization: `bearer ${BearerToken}`,
          "content-type": "multipart/form-data",
        },
      };

      var results = await post(AddImageUrl, formData, config);
      console.log(results);
    }

    //makes api call
    var Results = await Axios.post(
      "https://amsbackend.azurewebsites.net/api/home/UpdateTenantInfo",
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(this.OpenNoti(), this.SetMessage("Update was sucessful"));
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

  OpenNoti = () => {
    debugger;
    this.props.GetData();
    this.setState({
      OpenNoti: true,
    });
  };

  SetMessage = (message) => {
    this.setState({
      Message: message,
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };
  render() {
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
