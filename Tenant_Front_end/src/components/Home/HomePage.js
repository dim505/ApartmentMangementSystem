import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import AnnouncementIcon from "@material-ui/icons/Announcement";

export default class HomePage extends Component {
  state = {
    Home: {
      street: "10 Black Lane",
      City: "Boston",
      State: "MA",
      ZipCode: "11111"
    },
    AmountOwned: "5000.00",
    PaymentDueDate: "1/1/2020",
    LandLordInformation: {
      FirstName: "Slave",
      LastName: "Bill",
      Email: "slave@ill.com",
      PhoneNumber: "413-3332222"
    },
    PersonalInfo: {
      FirstName: "Billy",
      LastName: "Gram",
      Email: "bob@bob.com",
      PhoneNumber: "911-4535353"
    }
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                <Card classes={{ root: "CardHeight" }}>
                  <CardContent>
                    <Typography
                      classes={{ root: "CardTitle" }}
                      variant="h5"
                      component="h2"
                    >
                      Outstanding Balance
                    </Typography>

                    <Typography variant="body2" component="p">
                      <p>
                        {" "}
                        <b> Home </b>{" "}
                      </p>
                      <HomeIcon />
                      <p>
                        <i>
                          {" "}
                          {this.state.Home.street} {this.state.Home.City},
                          {this.state.Home.State} {this.state.Home.ZipCode}{" "}
                        </i>
                      </p>
                      <h1> ${this.state.AmountOwned} </h1>
                      <p> Due on {this.state.PaymentDueDate}</p>
                      <Button
                                variant="outlined"
                      >
                        {" "}
                        Pay Now
                      </Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card classes={{ root: "CardHeight" }}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Payment History
                    </Typography>

                    <Typography variant="body2" component="p">
                      <Button
                      variant="outlined"
                      >
                        View History
                      </Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <Card classes={{ root: "CardHeight" }}>
                  <CardContent>
                    <Typography
                      classes={{ h5: "Header" }}
                      variant="h5"
                      component="h2"
                    >
                      Personal Information
                    </Typography>

                    <Typography variant="body2" component="p">
                    <Avatar alt="Slave" src="/static/images/avatar/1.jpg" />
                      <b>
                        <p>
                          {" "}
                          {this.state.PersonalInfo.FirstName}{" "}
                          {this.state.PersonalInfo.LastName}
                        </p>
                        <p>{this.state.PersonalInfo.Email} </p>
                        <p>{this.state.PersonalInfo.PhoneNumber} </p>
                      </b>
                      <Button
                       variant="outlined"s
                      >
                        Edit Information
                      </Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card classes={{ root: "CardHeight" }}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Contact Land lord
                    </Typography>
                    <Avatar alt="Slave" src="/static/images/avatar/1.jpg" />
                    <b>
                      <p>
                        {" "}
                        {this.state.LandLordInformation.FirstName}{" "}
                        {this.state.LandLordInformation.LastName}{" "}
                      </p>
                      <p>{this.state.LandLordInformation.Email} </p>
                      <p> (413) 475-2222</p>
                    </b>
                    <Button
                     variant="outlined"
                    >
                      Contact Now{" "}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Card classes={{ root: "CardHeight" }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  News Feed
                </Typography>
                <Card classes={{ root: "CardBackground" }}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={2}>
                        <AnnouncementIcon />
                      </Grid>

                      <Grid item xs={10}>
                        <b>
                          {" "}
                          <p>News Header </p>{" "}
                        </b>
                        <Card classes={{ root: "NewsContentStyle" }}>
                          <CardContent>news body</CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
