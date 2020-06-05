import React, { Component } from "react";
import { Formik } from "formik";
import { ViewNewsForm } from "./ViewNewsForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import SnackBar from "../SnackBar";
import DialogBox from "../DialogBox";

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
    };
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
      OpnSaveWarningBox: true,
    });
  };
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  OpenNoti = () => {
    this.setState({
      OpenNoti: true,
      Message: "Announcement was scucessfully pushed",
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };
  render() {
    debugger;
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
