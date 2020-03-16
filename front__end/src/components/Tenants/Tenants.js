import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import house from "./house.jpeg";
import Grid from "@material-ui/core/Grid";
import Zoom from "react-reveal/Zoom";
import Box from "@material-ui/core/Box";
import Flip from "react-reveal/Flip";
import { Link } from "react-router-dom";
import TenantRemoveButton from "./TenantRemoveButton";
import Snackbar from "@material-ui/core/Snackbar";
import TenantModal from "./TenantModal";
export default class Tenants extends Component {
  state = {
    Tenants: [
      { GUID: "111", name: "1", phone: "1", LeaseRenew: "2020-01-01" },
      { GUID: "111", name: "1", phone: "1", LeaseRenew: "2020-01-01" },
      { GUID: "111", name: "1", phone: "1", LeaseRenew: "2020-01-01" },
      { GUID: "222", name: "2", phone: "2", LeaseRenew: "2020-01-01" },
      { GUID: "222", name: "2", phone: "2", LeaseRenew: "2020-01-01" },
      { GUID: "222", name: "2", phone: "2", LeaseRenew: "2020-01-01" }
    ],
    Properties: [
      { GUID: "111", Street: "65 Devans Street Greenfield, MA" },
      { GUID: "222", Street: "99 Blue Street Greenfield, MA" }
    ],
    TenantsFiltered: [],
    ShowTenantList: false,
    PropertyToShow: "",
    OpenTenantRmvNoti: false,
    OpnModal: false,
    OpenTenantSaveNoti: false
  };

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  ShowTenants = id => {
    debugger;
    console.log(id);
    var Row = [];

    let TenantsFiltered = this.state.Tenants;
    TenantsFiltered = TenantsFiltered.filter(Tenant => Tenant.GUID === id);
    this.setState({
      TenantsFiltered: TenantsFiltered,
      ShowTenantList: !this.state.ShowTenantList,
      PropertyToShow: id
    });
  };

  OpenTenantRmvNoti = () => {
    this.setState({ OpenTenantRmvNoti: true });
  };

  CloseTenantRmvNoti = () => {
    this.setState({ OpenTenantRmvNoti: false });
  };

  OpnModal = () => {
    this.setState({ OpnModal: true });
  };

  CloseModal = () => {
    this.setState({ OpnModal: false });
  };

  render() {
    var Row = [];
    if (this.state.ShowTenantList) {
      Row.push(
        <Grid container spacing={0}>
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid container item xs={3} justify="flex-end">
            <Button onClick={this.OpnModal} variant="outlined" color="primary">
              Edit
            </Button>
          </Grid>
        </Grid>
      );
      this.state.TenantsFiltered.map(Tenant =>
        Row.push(
          <Box
            bgcolor="error.main"
            color="primary.contrastText"
            display="flex"
            flexDirection="row"
          >
            <Grid item xs={4}>
              {Tenant.name}
            </Grid>
            <Grid item xs={4}>
              {Tenant.phone}
            </Grid>
            <Grid item xs={3}>
              {Tenant.LeaseRenew}
            </Grid>

            <Grid item xs={1}>
              <TenantRemoveButton
                OpenTenantRmvNoti={this.OpenTenantRmvNoti}
                CloseTenantRmvNoti={this.CloseTenantRmvNoti}
              />
            </Grid>
          </Box>
        )
      );
    }

    if (this.state.ShowTenantList === false) {
      Row = [];
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenTenantRmvNoti}
          onClose={() => this.CloseTenantRmvNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Tenant Has Been Removed </span>}
        />

        <TenantModal
          OpnModal={this.state.OpnModal}
          CloseModal={this.CloseModal}
          TenantsFiltered={this.state.TenantsFiltered}
          OpenTenantSaveNoti={this.OpenTenantSaveNoti}
        />
        <Zoom left>
          <Grid container spacing={0}>
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid container item xs={3} justify="flex-end">
              <Link to="./AddTenants">
                <Button variant="outlined" color="primary">
                  Add Tenants
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {this.state.Properties.map(Property => (
              <Grid item xs={6}>
                <Card Key={Property.GUID}>
                  <CardMedia
                    component="img"
                    alt="house"
                    height="250"
                    image={house}
                    title="house"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Property.Street}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    />
                  </CardContent>

                  <CardActions>
                    <Button
                      onClick={() => this.ShowTenants(Property.GUID)}
                      color="primary"
                    >
                      {" "}
                      Tenants{" "}
                    </Button>
                  </CardActions>
                </Card>
                <Flip
                  left
                  when={
                    this.state.ShowTenantList &&
                    this.state.PropertyToShow === Property.GUID
                  }
                >
                  <React.Fragment>{Row}</React.Fragment>
                </Flip>
              </Grid>
            ))}
          </Grid>
        </Zoom>
      </div>
    );
  }
}
