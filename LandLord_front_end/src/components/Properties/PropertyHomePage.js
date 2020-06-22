import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import house from "../Tenants/house.jpeg";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import Flip from "react-reveal/Flip";
import PropertyRemoveButton from "./PropertyRemoveButton";
import Snackbar from "@material-ui/core/Snackbar";
import PropertyUpdateModal from "./PropertyUpdateModal";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

//this is the property home page
export default class PropertyHomePage extends Component {
  state = {
    Properties: [],
    PropertiesFiltered: [
      {
        city: "Peralta",
        guid: "25959f33-2f52-4610-b811-832c278b63a8",
        state: "NM",
        street: "12 Verde Dr",
        tax: "1",
        unit: "11",
        yearlyInsurance: "1",
        zipCode: "87042",
      },
    ],
    ShowPropertyDetails: false,
    OpenPropertyRmvNoti: false,
    PropertyToShow: "",
    OpnModal: false,
  };

  async componentDidMount() {
    //this gets all the Properties
    this.GetProperties();
  }

  GetProperties = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();
    //waits 1/2 second because when property gets updated then immediately get properties again, it will not always
    //show the updated records
    setTimeout(() => {
      //makes api call to get all properties
      var results = Axios.get("https://localhost:5001/api/property", {
        headers: { Authorization: `bearer ${BearerToken}` },
      }).then((results) =>
        this.setState({
          Properties: results.data,
        })
      );
    }, 500);
  };

  //filters properties to show only 1 when modal is called
  FilterProperty(Guid) {
    let PropertiesFiltered = this.state.Properties;
    //returns only one property based on GUID
    PropertiesFiltered = PropertiesFiltered.filter(
      (Property) => Property.guid === Guid
    );
    this.setState({ PropertiesFiltered: PropertiesFiltered });
  }

  //function to show the addition information component and for whitch property
  ShowPropertyDetails(Guid) {
    if (
      this.state.ShowPropertyDetails === true &&
      this.state.PropertyToShow === Guid
    ) {
      this.setState({
        ShowPropertyDetails: false,
        PropertyToShow: "",
      });
    } else {
      this.setState({
        ShowPropertyDetails: true,
        PropertyToShow: Guid,
      });
    }
  }

  //opens "property was removed" notification
  OpenPropertyRmvNoti = () => {
    this.setState({ OpenPropertyRmvNoti: true });
  };

  //closes "property was removed" notification
  ClosePropertyRmvNoti = () => {
    this.setState({ OpenPropertyRmvNoti: false });
  };

  //opens modal used to update property info
  OpnModal(guid) {
    this.setState({ OpnModal: true });
    this.FilterProperty(guid);
  }

  //closes modal used to update property info
  CloseModal = () => {
    this.setState({ OpnModal: false });
  };

  render() {
    return (
      <div>
        <Bounce top>
          <Grid container spacing={0}>
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid container item xs={3} justify="flex-end">
              <Link to="/AddProperty">
                <Button variant="outlined" color="primary">
                  Add New Property
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            key={{ vertical: "top", horizontal: "center" }}
            open={this.state.OpenPropertyRmvNoti}
            onClose={() => this.ClosePropertyRmvNoti()}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">Property Removed</span>}
          />
          <PropertyUpdateModal
            PropertiesFiltered={this.state.PropertiesFiltered}
            OpnModal={this.state.OpnModal}
            CloseModal={this.CloseModal}
            GetProperties={this.GetProperties}
            auth={this.props.auth}
          />
          {this.state.Properties.length > 0 ? (
            <Grid container spacing={3}>
              {this.state.Properties.map((Property) => (
                <Grid item xs={6}>
                  <Card key={Property.guid}>
                    <CardMedia
                      component="img"
                      alt="house"
                      height="250"
                      image={house}
                      title="house"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {Property.street} {Property.city}, {Property.state}{" "}
                        {Property.zipCode}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        color="primary"
                        onClick={() => this.ShowPropertyDetails(Property.guid)}
                      >
                        More Info.{" "}
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => this.OpnModal(Property.guid)}
                      >
                        {" "}
                        Update{" "}
                      </Button>
                      <PropertyRemoveButton
                        GetProperties={this.GetProperties}
                        OpenPropertyRmvNoti={this.OpenPropertyRmvNoti}
                        guid={Property.guid}
                        auth={this.props.auth}
                      />
                    </CardActions>
                  </Card>
                  <Fade
                    top
                    opposite
                    when={
                      this.state.ShowPropertyDetails &&
                      this.state.PropertyToShow === Property.guid
                    }
                  >
                    <Box
                      bgcolor="error.main"
                      color="primary.contrastText"
                      display="flex"
                      flexDirection="row"
                    >
                      <Grid item xs={4}>
                        Units: {Property.unit}
                      </Grid>
                      <Grid item xs={4}>
                        Yearly Insurance: {Property.yearlyInsurance}
                      </Grid>
                      <Grid item xs={4}>
                        Yearly Tax: {Property.tax}
                      </Grid>
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <h1>
                ***** ¯\_(ツ)_/¯ No Properties Found. Please Add Some
                ¯\_(ツ)_/¯*****{" "}
              </h1>
            </div>
          )}
        </Bounce>
      </div>
    );
  }
}
