import React, { Component } from "react";
import Bounce from "react-reveal/Bounce";
import Button from "@material-ui/core/Button";
import MapContainer from "./googlemap";
import Chart from "./Chart";
import Game from "./Game";
import { Stage } from "react-konva";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";
import Axios from 'axios';

const useStyles = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
});
//home page https://github.com/fullstackreact/google-maps-react
export default class Home_Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Properties: [],
    Receipts: []
    };
  }

  //redirects user to log in page
  Login = () => {
    this.props.auth.loginWithRedirect();
  };


  componentDidMount () {
    this.getReceipts(); 
    this.GetProperties(); 
     
      

  }

  	//makes api call and sets state
    getReceipts = async () => {
      const BearerToken = await this.props.auth.getTokenSilently();
      var results =   Axios.get("https://amsbackend.azurewebsites.net/api/Home/GetReceiptTotals",
      {
       headers: {'Authorization': `bearer ${BearerToken}`}
 
     }
      ).then( (results) => 
      this.setState({
       Receipts: results.data
      }),
       
      );
 
 
   }


  GetProperties = async () => {
    //gets logged in user ID 
    const BearerToken = await this.props.auth.getTokenSilently();
    //waits 1/2 second because when property gets updated then immediately get properties again, it will not always
    //show the updated records 


    //makes api call to get all properties 
    var results =   Axios.get ("https://amsbackend.azurewebsites.net/api/property",
    {
      headers: {'Authorization': `bearer ${BearerToken}`}

    }
    )
    .then( (results) => 
        this.setState({
          Properties: results.data
      }),
      
      );

}


  render() {

    const classes = useStyles(useStyles);
    return (
        <div>
        {this.props.authenticated ||
        window.handleRedirectCallbackAlreadyCalled === 1 ? (
          <Bounce top>
            <div className="CenterAlignText">

              <h2>Welcome to your Dashboard</h2>    
              <Grid container>
                <Grid item xs={3}>
                  <Box classes={{ root: false ? "box" : "" }}>1</Box>
                </Grid>
                <Grid item xs={3}>
                  <Box bgcolor="error.main" color="primary.contrastText">
                    2
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box bgcolor="error.main" color="primary.contrastText">
                    3
                  </Box>
                </Grid>

                <Grid item xs={2}>
                  <Box bgcolor="error.main" color="primary.contrastText">
                    4
                  </Box>
                </Grid>
                <Box bgcolor="error.main" color="primary.contrastText" />
              </Grid>
              <h2>Daskboard Analytics</h2>
              <Chart Receipts={this.state.Receipts} />
              <h2>Location of All Properties 
              
              </h2>
              {
                this.state.Properties.length > 0 ?
                <MapContainer properties={this.state.Properties}/> : 
                <div><h3>***** ¯\_(ツ)_/¯ No Properties Found. Please Add Some ¯\_(ツ)_/¯*****</h3></div>
          
              }
              
            </div>
          </Bounce>
        ) : (
          <Bounce top>
            <div>
              <p>
                Looks Like you are not logged in... If you would like to see the
                rest of the application, Please Log in Here{" "}
              </p>
              <Button
                classes={{ label: "MenuItem" }}
                onClick={this.Login}
                variant="outlined"
                color="primary"
              >
                Log In
              </Button>

              <h1>
                {" "}
                Here are some bouncing balls while you wait <Loader size={10} />
              </h1>
              <Stage
                className="App"
                width={window.innerWidth}
                height={window.innerHeight}
              >
                <Game />
              </Stage>
            </div>
          </Bounce>
        )}
      </div>
    );
  }
}
