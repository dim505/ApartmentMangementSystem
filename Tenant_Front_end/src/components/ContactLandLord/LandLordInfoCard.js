import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import ContactLandLordModal from "./ContactLandLordModal"



export default class LandLordInfoCard extends Component { 
   state = {
    LandLordInformation: {
        FirstName: "Slave",
        LastName: "Bill",
        Email: "slave@ill.com",
        PhoneNumber: "413-3332222"
      },
      OpnModal: false 

   }

   OpenModal = () => {
    this.setState({
        OpnModal: true
    })
   }

   CloseModal = () => {
    this.setState({ 
        OpnModal: false
    })

   }
   
    render () {
        return (
        <div> 
            <ContactLandLordModal 
                OpnModal = {this.state.OpnModal}
                CloseModal = {this.CloseModal}
            />
            <Card classes={{ root: "CardHeight" }}>
            <CardContent>
              <Typography 
              classes={{ root: "CardTitle" }}
              variant="h5" component="h2">
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
              onClick={this.OpenModal}
               variant="outlined"
              >
                Contact Now{" "}
              </Button>
            </CardContent>
          </Card>
        </div>


        )


    }


}


