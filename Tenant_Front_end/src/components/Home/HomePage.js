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
import PersonalInfoCard from "../PersonalInfo/PersonalInfoCard";
import LandLordInfoCard from "../ContactLandLord/LandLordInfoCard";
import Axios from "axios";
import NewsCard from "../news/NewsCard";
import OutstandingBalanceInfoCard from "../OutstandingBalance/OutstandingBalanceInfoCard";
import PaymentHistCard from "../PaymentHistory/PaymentHistCard";

export default class HomePage extends Component {
  //this component contains all the child components of the home page

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                <OutstandingBalanceInfoCard
                  auth={this.props.auth}
                  results={this.props.results}
                  PaymentInfoCard={this.props.PaymentInfoCard}
                  GetData={this.props.GetData}
                />
              </Grid>

              <Grid item xs={6}>
                <PaymentHistCard
                  auth={this.props.auth}
                  results={this.props.results}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <PersonalInfoCard
                  results={this.props.results}
                  ProfilePictures={this.props.ProfilePictures}
                />
              </Grid>
              <Grid item xs={6}>
                <LandLordInfoCard
                  results={this.props.results}
                  ProfilePictures={this.props.ProfilePictures}
                  auth={this.props.auth}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <NewsCard results={this.props.results} auth={this.props.auth} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
