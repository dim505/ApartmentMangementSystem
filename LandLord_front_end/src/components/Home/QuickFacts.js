import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Axios from 'axios';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';


//contains a series of cards that summarize statistics about your apartments 
export default class QuickFacts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            YearlyPropExp: 0,
            NumberOFTenants: 0,
            PropertyStats: [
              {
            numberOfProperties:"0",
            totalInsurance:"0",
            totalTax:"0"

          }
            ]

        }


    }
  
  //gets data 
  componentDidMount () {
      this.GetYearlyPropExp()
      this.GetNumberOFTenants()
      this.GetPropertyStats() 
}

//gets data for the Yearly Property Expense quick chart 
GetYearlyPropExp = async () => {
            //gets logged in user ID 
            const BearerToken = await this.props.auth.getTokenSilently();

    //makes api call  
    var results =   Axios.get ("https://localhost:5001/api/home/YearlyPropExp",
    {
      headers: {'Authorization': `bearer ${BearerToken}`}

    }
    )
    .then( (results) => 
    //sets state
    {
        if (results.data[0].yearlyPropExp > 0) {
          this.setState({
            YearlyPropExp: results.data[0].yearlyPropExp
            })

        }
  }
      
      );
}

//gets data for the number of tenants quick facts chart 
GetNumberOFTenants = async () => {
    //gets logged in user ID 
    const BearerToken = await this.props.auth.getTokenSilently();
 

    //makes api call  
    var results =   Axios.get ("https://localhost:5001/api/home/NumberOFTenants",
    {
      headers: {'Authorization': `bearer ${BearerToken}`}

    }
    )
    .then( (results) => 
    //sets state
    {
      if (results.data[0].numberOFTenants > 0) {
        this.setState({
          NumberOFTenants: results.data[0].numberOFTenants
          })
      }
    }


      
      );

}

//Get the rest of the data for the quick fact cards 
GetPropertyStats  = async () => {
    //gets logged in user ID 
    const BearerToken = await this.props.auth.getTokenSilently();
 


    //makes api call  
    var results =   Axios.get ("https://localhost:5001/api/home/PropertyStats",
    {
      headers: {'Authorization': `bearer ${BearerToken}`}

    }
    )
    .then( (results) => 
		//sets state
        this.setState({
          PropertyStats: results.data
      }),
      
      );

}

  render() {
    return (
      <div>
        <Carousel offset={0} slidesPerPage={3} arrows infinite>
          <Card classes={{ root: "GenBoxCss box1" }}>
            <CardContent>
              <Typography variant="h6">
                Total Yearly Property Expenses (Receipt) <AttachMoneyIcon />
              </Typography>

              <Typography classes={{ root: "TextRight" }} color="textSecondary">
                ${this.state.YearlyPropExp} 
              </Typography>
            </CardContent>
          </Card>

          <Card classes={{ root: "GenBoxCss box2" }}>
            <CardContent>
              <Typography variant="h6">Total Number Of Tenants <PeopleIcon /></Typography>

              <Typography classes={{ root: "TextRight" }} color="textSecondary">
                {this.state.NumberOFTenants}{" "}
              </Typography>
            </CardContent>
          </Card>

          <Card classes={{ root: "GenBoxCss box3" }}>
            <CardContent>
              <Typography variant="h6">Total Number of Properties  <ApartmentIcon />  </Typography>

              <Typography classes={{ root: "TextRight" }} color="textSecondary">
                {
                
                
                this.state.PropertyStats[0].numberOfProperties > 0 ? 
                this.state.PropertyStats[0].numberOfProperties :
                0
              }
              </Typography>
            </CardContent>
          </Card>

          <Card classes={{ root: "GenBoxCss box4" }}>
            <CardContent>
              <Typography variant="h6">
                Total Property Tax Paid for the year <LocalAtmIcon/>
              </Typography>

              <Typography classes={{ root: "TextRight" }} color="textSecondary">
              ${  this.state.PropertyStats[0].totalTax > 0 ? 
                   this.state.PropertyStats[0].totalTax : 0   }
              </Typography>
            </CardContent>
          </Card>

          <Card classes={{ root: "GenBoxCss box4" }}>
            <CardContent>
              <Typography variant="h6">
                Total Insurnace Paid for the year <MonetizationOnIcon />
              </Typography>

              <Typography classes={{ root: "TextRight" }} color="textSecondary">
              ${this.state.PropertyStats[0].totalInsurance > 0 ? 
                this.state.PropertyStats[0].totalInsurance : 0}
              </Typography>
            </CardContent>
          </Card>
        </Carousel>
      </div>
    );
  }
}
