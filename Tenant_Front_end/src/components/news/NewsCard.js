
import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


import Typography from "@material-ui/core/Typography";

import AnnouncementIcon from "@material-ui/icons/Announcement";




export default class NewsCard extends Component { 
  state = {
        news: [
          {
            title: "Rent Delay",
            body : "Not delayed for another month",
            DatePosted: "1/2/2012"
          },
          {
            title: "electrical problems",
            body : "eletrician coming in 3 months. If you run out of paper sucks fooo yuo!!!!!!!",
            DatePosted: "1/2/2015 5:50 PM"
          },




        ]

  }

  render () {
		return (
				            <Card classes={{ root: "CardHeight" }}>
              <CardContent>
                <Typography  classes={{ root: "CardTitle" }} variant="h5" component="h2">
                  News Feed
                </Typography>
                <Card classes={{ root: "CardBackground" }}>
                  <CardContent>
                 
                  {this.state.news.map(NewsItem => 
                      
                      
                     
                    <Grid container>
                      <Grid item xs={2}>
                        <AnnouncementIcon />
                      </Grid>

                      <Grid item xs={10}>
                        
                        


                        
                        <b>
                          {" "}
                          <p>{NewsItem.title} </p>{" "}
                        </b>
                        <Card classes={{ root: "NewsContentStyle" }}>
                          <CardContent>{NewsItem.body}</CardContent>
                         <div className="NewsCardTimeStamp">{NewsItem.DatePosted}</div> 
                        </Card>
                      </Grid>
                    </Grid>

                        )}
                      
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
		
		)
	}



}

