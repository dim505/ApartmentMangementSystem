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

export default class Tenants extends Component {
  render() {
    return (
      <Zoom top>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card className>
              <CardMedia
                component="img"
                alt="house"
                height="250"
                image={house}
                title="house"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  99 BLue Lane Boston MA
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This is apartment 1
                </Typography>
              </CardContent>

              <CardActions>
                <Button color="primary">Expenses </Button>
                <Button color="primary"> Tenante </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className>
              <CardMedia
                component="img"
                alt="house"
                height="250"
                image={house}
                title="house"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                98 BLue Lane Boston MA
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This is my main house
                </Typography>
              </CardContent>

              <CardActions>
                <Button color="primary">Expenses </Button>
                <Button color="primary"> Tenante </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Zoom>
    );
  }
}
