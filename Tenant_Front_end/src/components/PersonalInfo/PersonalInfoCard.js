import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";


//parent component that displays the tenants information and a profile picture
export default class PersonalInfoCard extends Component {
  state = {
    PersonalInfo: {
      FirstName: "Billy",
      LastName: "Gram",
      Email: "bob@bob.com",
      PhoneNumber: "911-4535353",
    },

    Image: "",
  };

  //formats image if pictures are retrived
  componentDidMount() {
    if (this.props.ProfilePictures.length > 0) {
      this.FormatImage();
    }
  }
  //checks to format image with each render
  componentDidUpdate(prevProps) {
    if (this.props.ProfilePictures.length > 0 && this.state.Image === "") {
      this.FormatImage();
    }
  }

  //function used to Format image

  FormatImage() {
    var objectURL = this.CreateImageUrl(
      this.props.ProfilePictures[0].tenimage,
      this.props.ProfilePictures[0].tencontentType
    );
    this.setState({ Image: objectURL });
    Window.ProfileImageName = this.props.ProfilePictures[0].tenfilename;
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
    return (
      <Card classes={{ root: "CardHeight" }}>
        <CardContent>
          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            Personal Information
          </Typography>

          <Typography variant="body2" component="p">
            <Avatar alt="" src={this.state.Image} />

            {this.props.results.length <= 0 ? (
              <b>
                {" "}
                <p>
                  No data found <SentimentVeryDissatisfiedIcon /> Please make
                  sure you were added as a Tenant by the Landlord.
                </p>{" "}
              </b>
            ) : (
              <div>
                <b>
                  <p> {this.props.results[0].name}</p>
                  <p>{this.props.results[0].email} </p>
                  <p>{this.props.results[0].phone} </p>
                </b>

                <Link to="/EditPersonalInfo">
                  <Button variant="outlined">Edit Information</Button>
                </Link>
              </div>
            )}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
