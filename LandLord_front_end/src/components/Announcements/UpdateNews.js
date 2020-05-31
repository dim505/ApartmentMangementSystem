import React, { Component } from "react";
import { Formik } from "formik";
import { UpdateNewsForm } from "./UpdateNewsForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import SnackBar from "../SnackBar";
import DialogBox from "../DialogBox";
import Axios from "axios";

const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required"),
});

class UpdateNews extends Component {
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

  Save = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();
    this.CloseSaveWarnBox();
    this.props.CloseModal();
    var Mydata = {};
    Mydata = window.values;
    //makes api call
    var Results = await Axios.post(
      "https://localhost:5001/api/Property/AddProperty",
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((Results) => console.log(Results));

    this.props.OpenNoti("Changes Saved");
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
    debugger;
    const values = {
      Subject: this.props.PropNewsFiltered[0].NewsHeader,
      Message: this.props.PropNewsFiltered[0].NewsBody,
      House: this.props.PropNewsFiltered[0].Property,
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
              Edit Announcements
            </Typography>
            <Formik
              enableReinitialize
              initialValues={values}
              onSubmit={this.submitValues}
              validationSchema={validationSchema}
              render={(props) => <UpdateNewsForm {...props} />}
            />
          </Paper>
        </div>

        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={this.Save}
          message="Are you sure you want to save"
        />
      </React.Fragment>
    );
  }
}

export default UpdateNews;
