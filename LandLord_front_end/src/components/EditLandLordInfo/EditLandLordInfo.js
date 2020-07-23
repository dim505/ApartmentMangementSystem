import React, { Component, cloneElement } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { EditLandLordInfoForm } from "./EditLandLordInfoForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import SnackBar from "../shared/SnackBar";
import DialogBox from "../shared/DialogBox";
import Axios from "axios";
import { post } from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";

//declares rules for validating textfields

const validationSchema = Yup.object({
  Name: Yup.string("Enter a name").required("Name is required"),
  Email: Yup.string("Enter your email")
    .required("Email is required")
    .email("Enter a valid Email"),
  PhoneNumber: Yup.string("Enter a Phone Number")
    .required("Phone Number is required")
    .min(16),
});

class EditLandLordInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenNoti: false,
      Message: "",
      Name: "",
      Email: "",
      PhoneNumber: "",
      Image: "",
      AccountDetails: "",
      ProfilePic: "",
    };
  }

  //opens warning box when submit is clicked
  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;

    this.OpenSaveWarnBox();
    //;
  };

  //if user clicks yes, it makes api call to saved landlord account information
  Save = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    this.CloseSaveWarnBox();
    window.resetForm({});

    //makes api call to update image if an image has been uploaded
    if (window.values.file !== "" && window.TenantPicture !== undefined) {
      const AddImageUrl = `${process.env.REACT_APP_BackEndUrl}/api/AccountDetails/Add_Update_LandLord_Image`;
      const formData = new FormData();
      formData.append("body", window.TenantPicture);
      const config = {
        headers: {
          Authorization: `bearer ${BearerToken}`,
          "content-type": "multipart/form-data",
        },
      };

      var results = await post(AddImageUrl, formData, config);
    }

    //builds out object
    var Mydata = {};
    Mydata.accountDetails = window.values;

    //makes API call to update text portion of account details
    var Results = await Axios.post(
      `${process.env.REACT_APP_BackEndUrl}/api/AccountDetails/Add_Update_LandLordInfo`,
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(this.OpenNoti("Update was sucessful"));
  };

  //function used to open warning box
  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true,
    });
  };
  //function used to close warning box
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };
  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
    setTimeout(() => this.props.GetData(), 500);
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    var IsAcctDetEmpty;
    this.props.AccountDetails.length > 0
      ? (IsAcctDetEmpty = false)
      : (IsAcctDetEmpty = true);
    const values = {
      Name: IsAcctDetEmpty ? "" : this.props.AccountDetails[0].name,
      Email: IsAcctDetEmpty ? "" : this.props.AccountDetails[0].email,
      PhoneNumber: IsAcctDetEmpty
        ? ""
        : this.props.AccountDetails[0].phoneNumber,
      file:
        this.props.ProfilePictures.length <= 0
          ? ""
          : this.props.ProfilePictures[0].filename,
    };
    return (
      <Fade top>
        <React.Fragment>
          <Link to="/AccountDetails">
            <Button variant="outlined">Back</Button>
          </Link>

          <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={1}>
            <Typography
              classes={{ root: "CardTitle" }}
              variant="h5"
              component="h2"
            >
              Edit Land Lord Details
            </Typography>
            <Formik
              enableReinitialize={true}
              initialValues={values}
              onSubmit={this.submitValues}
              validationSchema={validationSchema}
              render={(props) => (
                <EditLandLordInfoForm
                  OpenNoti={this.OpenNoti}
                  SetMessage={this.SetMessage}
                  {...props}
                />
              )}
            />
          </Paper>
          <SnackBar
            position="bottom"
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
      </Fade>
    );
  }
}

export default EditLandLordInfo;
