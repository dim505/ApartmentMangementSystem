import React, { Component } from "react";
import { Formik } from "formik";
import { AddNewsForm } from "./AddNewsForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import SnackBar from "../SnackBar";
import DialogBox from "../DialogBox";
import Axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";

const validationSchema = Yup.object({
  Subject: Yup.string("Enter a Subject").required("Subject is Required"),
  Message: Yup.string("Enter a Message").required("Message is Required"),
  HouseSelect: Yup.string("").required("Please Select a House"),
});

class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [{ id: 1, Address: "12 verde Drive Greenfield MA" }],
      OpenNoti: false,
      Message: "",
    };
  }

  componentDidMount() {
    this.SetData();
  }

  SetData = async () => {
    window.properties = [];
    await this.setState({
      properties: [
        { guid: 1, Address: "All Properties" },
        { guid: 4, Address: "12 verde Drive Greenfield MA" },
        { guid: 2, Address: "9 verde Drive Greenfield MA" },
        { guid: 3, Address: "66 verde Drive Greenfield MA" },
      ],
    });

    this.state.properties.map((property) =>
      window.properties.push(
        <MenuItem key={property.guid} value={property.guid}>
          {" "}
          {property.Address}
        </MenuItem>
      )
    );
  };

  submitValues = (values, { resetForm }) => {
    window.values = values;
    window.resetForm = resetForm;
    this.OpenSaveWarnBox();
    //;
  };

  Save = async () => {
    this.CloseSaveWarnBox();
    window.resetForm({});
    this.OpenNoti();
    console.log(window.values);
    /*var MyData = {};
    MyData.Announcement = window.values;
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes API call
    var results = Axios.post(
      "https://localhost:5001/api/tenant/UpdateTenant",
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` }
      }
    ).then(results => console.log(results)); */
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
                Announcements
              </Typography>
              <Formik
                enableReinitialize
                initialValues={values}
                onSubmit={this.submitValues}
                validationSchema={validationSchema}
                render={(props) => <AddNewsForm {...props} />}
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
      </Fade>
    );
  }
}

export default AddNews;
