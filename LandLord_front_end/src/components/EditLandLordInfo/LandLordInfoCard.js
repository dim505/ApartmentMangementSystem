import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { FormatImage } from "../shared/SharedFunctions";

//component acts as a parent for the Personal info card
export default class PersonalInfoCard extends Component {
  state = {
    PersonalInfo: {
      FirstName: "Billy",
      LastName: "Gram",
      Email: "bob@bob.com",
      PhoneNumber: "911-4535353",
      Image: "",
    },
  };

  componentDidMount() {
    //this formats the format so It can be used in the browser

    if (this.props.ProfilePictures.length > 0) {
      var objectURL = FormatImage(
        this.props.ProfilePictures[0].image,
        this.props.ProfilePictures[0].contentType
      );
      this.setState({ Image: objectURL });
    }
  }

  render() {
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

              {this.props.AccountDetails.length <= 0 ? (
                <b>
                  {" "}
                  <p>No data found</p>{" "}
                </b>
              ) : (
                <div>
                  <b>
                    <p> {this.props.AccountDetails[0].name}</p>
                    <p>{this.props.AccountDetails[0].email} </p>
                    <p>{this.props.AccountDetails[0].phoneNumber} </p>
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
