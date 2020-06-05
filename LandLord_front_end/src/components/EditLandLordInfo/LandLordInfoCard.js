import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Axios from "axios";
import Fade from "react-reveal/Fade";

export default class PersonalInfoCard extends Component {
  state = {
    PersonalInfo: {
      FirstName: "Billy",
      LastName: "Gram",
      Email: "bob@bob.com",
      PhoneNumber: "911-4535353",
      Image: "",
    },
    AccountDetails: [],
    ProfilePictures: [],
  };

  componentDidMount() {
    if (
      this.state.AccountDetails.length <= 0 &&
      this.state.ProfilePictures.length <= 0
    ) {
      this.GetData();
    }
  }

  GetData = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    //makes api call  and sets state
    var results = Axios.get(
      "https://amsbackend.azurewebsites.net/api/AccountDetails/GetAccountInfo",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => {
      this.setState({
        AccountDetails: results.data,
      });
    });

    //makes api call  and sets state
    var results = Axios.get(
      "https://amsbackend.azurewebsites.net/api/AccountDetails/GetAccountPhotoInfo",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(async (results) => {
      await this.setState({
        ProfilePictures: results.data,
      });

      this.FormatImage();
    });
  };

  FormatImage(ProfilePictures) {
    debugger;
    var objectURL = this.CreateImageUrl(
      this.state.ProfilePictures[0].image,
      this.state.ProfilePictures[0].contentType
    );
    this.setState({ Image: objectURL });
    Window.ProfileImageName = this.state.ProfilePictures[0].filename;
  }

  //converts string from data bases to an array buffer
  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  //this function creates a URl to view the image
  CreateImageUrl(ImageStr, ImageType) {
    const data = ImageStr;
    const arrayBuffer = this.base64ToArrayBuffer(data);
    const blob = new Blob([arrayBuffer], { type: ImageType });
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  }

  render() {
    window.AccountDetails = this.state.AccountDetails;
    return (
      <Fade top>
        <Card classes={{ root: "CardHeight" }}>
          <CardContent>
            <Typography
              classes={{ root: "CardTitle" }}
              variant="h5"
              component="h2"
            >
              Land Lord Information
            </Typography>

            <Typography variant="body2" component="p">
              <Avatar alt="" src={this.state.Image} />

              {this.state.AccountDetails.length <= 0 ? (
                <b>
                  {" "}
                  <p>No data found</p>{" "}
                </b>
              ) : (
                <div>
                  <b>
                    <p> {this.state.AccountDetails[0].name}</p>
                    <p>{this.state.AccountDetails[0].email} </p>
                    <p>{this.state.AccountDetails[0].phoneNumber} </p>
                  </b>
                </div>
              )}

              <Link to="/EditAccountDetails">
                <Button variant="outlined">Edit Information</Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    );
  }
}
