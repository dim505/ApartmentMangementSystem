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
import Axios from 'axios';
import Box from "@material-ui/core/Box";
import Flip from "react-reveal/Flip";
import PropertyRemoveButton from './PropertyRemoveButton';
import Snackbar from "@material-ui/core/Snackbar";


export default class PropertyHomePage extends Component {
    state = {Properties:[], PropertiesFiltered: [], ShowPropertyDetails: false,
       OpenPropertyRmvNoti: false,PropertyToShow: ""}
  
  
  async componentDidMount() {
    
    //this gets all the Properties 
    this.GetProperties();      
    }

    GetProperties = () => {
      
      var results =   Axios({
        url: "https://localhost:5001/api/property"
       }).then( (results) => 
       this.setState({
        Properties: results.data
       }),
        
       );



    }

    ShowPropertyDetails (Guid) {
      /*
      debugger;
      let ReceiptFilterd = this.state.Receipts;
      ReceiptFilterd = ReceiptFilterd.filter(Receipt => Receipt.id === id);
      this.setState({ OpnReceiptViewModal: true, ReceiptFilterd: ReceiptFilterd });
      
      let PropertiesFiltered = this.state.Properties
      PropertiesFiltered = PropertiesFiltered.filter(Property => Property.Guid === Guid);*/

      this.setState({ShowPropertyDetails: !this.state.ShowPropertyDetails,
        PropertyToShow: Guid
      
      })
    }


    OpenPropertyRmvNoti = () => {
      this.setState({ OpenPropertyRmvNoti: true })
      
    }

    ClosePropertyRmvNoti = () => {
      this.setState({ OpenPropertyRmvNoti: false })

    }
 
  
  render () {
            return (
              <div>
      <Flip left>
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
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenPropertyRmvNoti}
          onClose={() => this.ClosePropertyRmvNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Property Removed</span>}
        />

        { this.state.Properties.length > 0 ? (
              <Grid container spacing={3}>
          
                      {this.state.Properties.map (Property =>
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
                                   {Property.street} {Property.city}, {Property.state}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <Button color="primary" onClick= {() => this.ShowPropertyDetails(Property.guid)}>More Info. </Button>
                            <Button color="primary"> Update </Button>
                           <PropertyRemoveButton 
                           GetProperties = {this.GetProperties}
                           OpenPropertyRmvNoti = {this.OpenPropertyRmvNoti} 
                           guid = {Property.guid}
                           />
                          </CardActions>
                        </Card>
                        <Flip left when={this.state.ShowPropertyDetails && this.state.PropertyToShow === Property.guid}>
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
                                Yearly Insurance:  {Property.yearlyInsurance}
                              </Grid>
                              <Grid item xs={4}>
                                Yearly Tax: {Property.tax} 
                              </Grid>

                            </Box>
                            </Flip>
                        </Grid>
                        )}
                    </Grid> ) : (
                            <div><h1>***** ¯\_(ツ)_/¯ No Properties Found. Please Add Some ¯\_(ツ)_/¯***** </h1></div>


                    )
                  }    
                </Flip>
                    </div>


            )



    }

    

}




