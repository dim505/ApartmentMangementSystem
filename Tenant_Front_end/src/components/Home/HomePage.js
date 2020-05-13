import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import PersonalInfoCard from "../PersonalInfo/PersonalInfoCard"
import LandLordInfoCard from "../ContactLandLord/LandLordInfoCard"
import Axios from 'axios';
import NewsCard from "../news/NewsCard"

export default class HomePage extends Component {
  state = {
    results: [
      
    ],
    AmountOwned: "5000.00",
    PaymentDueDate: "1/1/2020"
  };

  componentDidMount() {
    this.GetData()
  }

  GetData  = async () => {
  	//makes api call and sets state
    
      const BearerToken = await this.props.auth.getTokenSilently();
      var results =   Axios.get("https://localhost:5001/api/home/GetAccountDetails",
      {
       headers: {'Authorization': `bearer ${BearerToken}`}
 
     }
      ).then( (results) => 
       this.setState({
       results: results.data
      }),
       
      );
 
 
  



  }



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
                          {this.state.results.length <= 0 ?             <p>No data found</p>                 :
                         
                          <p>
                          {this.state.results[0].street} {this.state.results[0].city},
                          {this.state.results[0].state} {this.state.results[0].zipCode}
                          </p>

                          }

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
                    <PersonalInfoCard
                    results = {this.state.results}
                    />
              </Grid>
              <Grid item xs={6}>
                    <LandLordInfoCard />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
                  <NewsCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}
