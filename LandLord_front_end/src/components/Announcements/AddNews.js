import React, { Component } from "react";
import { Formik } from "formik";
import { AddNewsForm } from "./AddNewsForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import SnackBar from "../shared/SnackBar";
import DialogBox from "../shared/DialogBox";
import Axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";

//declares rules for validating textfields

const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required"),
  HouseSelect: Yup.string("").required("Please Select a House"),
});

//component contains textfields/submit button to add a new item
class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      OpenNoti: false,
      Message: "",
    };
  }

  //gets data for list of properties on component mount
  componentDidMount() {
    this.SetData();
  }

  //makes api call to get data
  SetData = async () => {
    window.propertiesUnFormatted = [];
    window.propertiesFormatted = [];

    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    //makes api call  and sets state
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/property`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => {
      this.ApiCallResults(results);
    });
  };

  //sets state
  ApiCallResults = (results) => {
    window.propertiesUnFormatted = results.data;
    this.FormatData();
    this.setState({
      properties: window.propertiesFormatted,
    });
  };

  //builds out select list of properties
  FormatData = () => {
    window.propertiesUnFormatted.map((property) =>
      window.propertiesFormatted.push(
        <MenuItem key={property.guid} value={property.guid}>
          {" "}
          {property.street} {property.city}, {property.state} {property.zipCode}
        </MenuItem>
      )
    );
  };

  //opens warning box when submit is clicked
  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;
    this.OpenSaveWarnBox();
    //;
  };

  //if user clicks yes, it makes api call to add news
  Save = async () => {
    //closes warning dialog
    this.CloseSaveWarnBox();
    //resets form
    window.resetForm({});
    //opens this was successful notification
    this.OpenNoti();

    //builds out object
    var MyData = {};
    MyData.Announcement = window.values;
    //gets auth0 token
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes API call
    var results = Axios.post(
      `${process.env.REACT_APP_BackEndUrl}/api/Announcements/AddNews`,
      MyData,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => console.log(results));
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
      Message: "Announcement was successfully pushed",
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };
  render() {
    const values = {
      Subject: "",
      Message: "",
      HouseSelect: "",
      properties: this.state.properties,
    };
    return (
      <Fade top>
        <React.Fragment>
          <div>
            <Link to="/Announcements">
              <Button variant="outlined">Back</Button>
            </Link>
            <Paper classes={{ root: "CardHeight CardFormStyle" }} elevation={3}>
              <Typography
                classes={{ root: "CardTitle" }}
                variant="h5"
                component="h2"
              >
                Add Announcements
              </Typography>
              <Formik
                enableReinitialize
                initialValues={values}
                onSubmit={this.submitValues}
                validationSchema={validationSchema}
                render={(props) => (
                  <AddNewsForm properties={this.state.properties} {...props} />
                )}
              />
            </Paper>
          </div>
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
            message="Are you sure you want to add Announcement"
          />
        </React.Fragment>
      </Fade>
    );
  }
}

export default AddNews;
