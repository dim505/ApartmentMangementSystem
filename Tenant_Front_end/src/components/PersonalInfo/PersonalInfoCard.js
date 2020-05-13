import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";



export default class PersonalInfoCard extends Component {
    state = {
        PersonalInfo: {
            FirstName: "Billy",
            LastName: "Gram",
            Email: "bob@bob.com",
            PhoneNumber: "911-4535353"
          }
    }
    render () {
        return (

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
                  {this.props.results.length <= 0 ? <p>No data found</p>   
                :
              <div>
                <p>
                {" "}
                {this.props.results[0].name}
              </p>
              <p>{this.props.results[0].email} </p>
              <p>{this.props.results[0].phone} </p>
              </div>
                
                }

                </b>
              <Link to="/EditPersonalInfo">
                <Button
                 variant="outlined"
                >
                  Edit Information
                </Button>
              </Link>
              
              </Typography>
            </CardContent>
          </Card>


        )


    }
}