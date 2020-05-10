import React, { Component } from "react";

import "@brainhubeu/react-carousel/lib/style.css";
import Image from "./Hotel.jpg";
import Paper from "@material-ui/core/Paper";
import ApartmentIcon from "@material-ui/icons/Apartment";

import { white } from "material-ui/styles/colors";

import { Alert, AlertTitle } from "@material-ui/lab";

const styles = {
  paperContainer: {
    color: white,
    height: 150,
    width: "50%",
    left: 0,
    right: 0,
    margin: "auto",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no repeat",
    WebkitTextStroke: "1px black"
  },

  root: {
    marginTop: 10
  }
};

export default class App extends Component {
  state = {
    YearlyPropExp: 9000,
    NumberOFTenants: 20,
    NumOfProp: 0,
    TotalTax: 0,
    TotalInsurance: 0,
    Name: "Dmitriy K"
  };

  render() {
    return (
      <div>
        <Paper elevation={7} style={styles.paperContainer}>
          <div className="center">
            <h2> Apartment Management System </h2>
            <ApartmentIcon style={{ fontSize: 48 }} />
          </div>
        </Paper>

        <Alert style={styles.root} variant="outlined" severity="success">
          <AlertTitle>Welcome Back {this.state.Name} </AlertTitle>
        </Alert>
      </div>
    );
  }
}
