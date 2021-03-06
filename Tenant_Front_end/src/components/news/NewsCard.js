import React, { Component } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import AnnouncementIcon from "@material-ui/icons/Announcement";

//this parent component will contain all the news items
export default class NewsCard extends Component {
  state = {
    news: [],
  };

  //checks if api call is made and makes api call
  componentDidMount() {
    window.NewsApiCallMade = false;
    if (this.props.results.length > 0) {
      this.GetPropNews();
    }
  }

  //checks if api call is made with each render and makes api call
  componentDidUpdate(prevProps) {
    if (
      this.props.results.length > 0 &&
      window.NewsApiCallMade ===
        false /*this.props.results[0].email !== prevProps.results[0].email*/
    ) {
      this.GetPropNews();
    }
  }
  GetPropNews = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();
    window.NewsApiCallMade = true;
    //makes api call  and sets state
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/TenHome/GetNews/${this.props.results[0].email}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => {
      this.setState({
        news: results.data,
      });
    });
  };

  render() {
    return (
      <Card classes={{ root: "CardHeight" }}>
        <CardContent>
          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            News Feed
          </Typography>
          <Card classes={{ root: "CardBackground" }}>
            <CardContent>
              {this.state.news.length <= 0 ? (
                <div>
                  <b>No News Found</b>
                </div>
              ) : (
                this.state.news.map((NewsItem) => (
                  <Grid container>
                    <Grid item xs={2}>
                      <AnnouncementIcon />
                    </Grid>

                    <Grid item xs={10}>
                      <b>
                        {" "}
                        <p>{NewsItem.subject} </p>{" "}
                      </b>
                      <Card classes={{ root: "NewsContentStyle" }}>
                        <CardContent>{NewsItem.message}</CardContent>
                        <div className="NewsCardTimeStamp">
                          {NewsItem.dateAdded}
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                ))
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}
