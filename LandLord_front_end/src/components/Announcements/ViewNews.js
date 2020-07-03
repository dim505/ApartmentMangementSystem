import React, { Component } from "react";
import { Formik } from "formik";
import { ViewNewsForm } from "./ViewNewsForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import SnackBar from "../shared/SnackBar";
import DialogBox from "../shared/DialogBox";

//declares rules for validating textfields
const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required"),
  HouseSelect: Yup.string("").required("Please Select a House"),
});

class ViewNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [{ id: 1, Address: "12 verde Drive Greenfield MA" }],
      OpenNoti: false,
      Message: "",
	  OpnSaveWarningBox: false
    };
  }

  //opens warning box when submit is clicked
  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;
    this.OpenSaveWarnBox();
    //;
  };

  //if user clicks yes, it makes api call to add news
  Save = () => {
    //closes warning dialog
    this.CloseSaveWarnBox();
    //resets form
    window.resetForm({});
    //opens this was successful notification
    this.OpenNoti();
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
  OpenNoti = () => {
    this.setState({
      OpenNoti: true,
      Message: "Announcement was scucessfully pushed",
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };
  render() {
    debugger;
    //builds out address from API call results
    var Address =
      this.props.PropNewsFiltered[0].street +
      " " +
      this.props.PropNewsFiltered[0].city +
      ", " +
      this.props.PropNewsFiltered[0].state +
      " " +
      this.props.PropNewsFiltered[0].zipCode;
    const values = {
      Subject: this.props.PropNewsFiltered[0].subject,
      Message: this.props.PropNewsFiltered[0].message,
      House: Address,
    };
    return (
      <React.Fragment>
        <div>
          <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={3}>
            <Typography
              classes={{ root: "CardTitle" }}
              variant="h5"
              component="h2"
            >
              View Announcements
            </Typography>
            <Formik
              enableReinitialize
              initialValues={values}
              onSubmit={this.submitValues}
              validationSchema={validationSchema}
              render={(props) => <ViewNewsForm {...props} />}
            />
          </Paper>
        </div>
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

export default ViewNews;
