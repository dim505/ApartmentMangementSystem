import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import SnackBar from "../Shared/SnackBar";
import ContactLandLordModal from "./ContactLandLordModal";
import Fade from "react-reveal/Fade";
import {
  FormatImage,
  base64ToArrayBuffer,
  CreateImageUrl,
} from "../Shared/SharedFunctions";

export default class LandLordInfoCard extends Component {
  state = {
    LandLordInformation: {
      FirstName: "Slave",
      LastName: "Bill",
      Email: "slave@ill.com",
      PhoneNumber: "413-3332222",
    },
    OpnModal: false,
    Image: "",
  };

  componentDidMount() {
    //this formats the format so It can be used in the browser

    if (this.props.ProfilePictures.length > 0) {
      var objectURL = FormatImage(
        this.props.ProfilePictures[0].landimage,
        this.props.ProfilePictures[0].landcontentType
      );
      this.setState({ Image: objectURL });
    }
  }

  //checks to format image with each render
  componentDidUpdate(prevProps) {
    if (this.props.ProfilePictures.length > 0 && this.state.Image === "") {
      var objectURL = FormatImage(
        this.props.ProfilePictures[0].landimage,
        this.props.ProfilePictures[0].landcontentType
      );
      this.setState({ Image: objectURL });
    }
  }

  //opens notification
  OpenNoti = () => {
    this.setState({ OpenNoti: true, Message: "Message was successfully sent" });
  };
  //closes notification
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  //opens modal
  OpenModal = () => {
    this.setState({
      OpnModal: true,
    });
  };

  //closes modal
  CloseModal = () => {
    this.setState({
      OpnModal: false,
    });
  };

  render() {
    return (
      <div>
        <Fade top opposite>
          <ContactLandLordModal
            OpnModal={this.state.OpnModal}
            CloseModal={this.CloseModal}
            OpenNoti={this.OpenNoti}
            results={this.props.results}
            auth={this.props.auth}
          />
        </Fade>
        <Card classes={{ root: "CardHeight" }}>
          <CardContent>
            <Typography
              classes={{ root: "CardTitle" }}
              variant="h5"
              component="h2"
            >
              Contact Land lord
            </Typography>
            <Avatar alt="Bob" src={this.state.Image} />
            {this.props.results.length <= 0 ? (
              <b>
                {" "}
                <p>No data found</p>{" "}
              </b>
            ) : (
              <div>
                <b>
                  <p> {this.props.results[0].landLordName} </p>
                  <p> {this.props.results[0].landLordEmail} </p>
                  <p> {this.props.results[0].landLordPhoneNumber}</p>
                </b>
                <Button onClick={this.OpenModal} variant="outlined">
                  Contact Now{" "}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <SnackBar
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />
      </div>
    );
  }
}
