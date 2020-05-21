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
import Axios from 'axios';
import { post } from 'axios';

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
    this.state = {
      OpenNoti: false,
      Message: "",
      Image: ""
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
    var Mydata = { }
    Mydata.tenant =  window.values


    if (window.values.file !== "") 
    {
      const AddImageUrl = `https://localhost:5001/api/home/AddTenantImage`;
      const formData = new FormData();
      formData.append("body", window.TenantPicture)
      const config = {
          headers: {
            'Authorization': `bearer ${BearerToken}`,
            'content-type' : "multipart/form-data"
          }
      }

      var results = await post (AddImageUrl,formData,config)
      console.log(results)

    } 


    //makes api call
    var Results = await Axios.post(
      "https://localhost:5001/api/home/UpdateTenantInfo",
      Mydata,
      {
        headers: {'Authorization': `bearer ${BearerToken}`}

      }
    ).then(
      this.OpenNoti()     
    ); 


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
    this.props.GetData()
  this.setState({
      OpenNoti: true,
      Message: "Edited have been scucessfully saved"
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false
    });
  };
  render() {
    const values = {
      Name: this.props.results[0].name,
      Email: this.props.results[0].email,
      PhoneNumber: this.props.results[0].phone,
      file: Window.ProfileImageName
    };
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
        <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={1}>
          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            Edit Personal Details
          </Typography>
          <Formik
            enableReinitialize
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={this.submitValues}
            render={props => <EditPersonalInfoForm {...props} />}
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
      </React.Fragment>
    );
  }
}

export default EditPersonalInfo;
