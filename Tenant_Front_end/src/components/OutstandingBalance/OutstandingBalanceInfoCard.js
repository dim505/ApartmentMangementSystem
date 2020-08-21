import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import SnackBar from "../Shared/SnackBar";
import AnnonModal from "../Shared/AnnonModal";
import PaymentPortalMainPage from "../PaymentHistory/PaymentPortalMainPage";
import Axios from "axios";

//this component tells users how much money they owe and when its due
export default class OutstandingBalanceInfoCard extends Component {
  state = {
    AmountOwned: "5000.00",
    PaymentDueDate: "1/1/2020",
    OpenNoti: "",
    Message: "",
    OpnModal: "",
  };

  //function opens payment portal modal
  OpnModal = () => {
    this.setState({
      OpnModal: true,
    });
  };

  //function closes payment portal modal
  CloseModal = () => {
    this.setState({
      OpnModal: false,
    });
  };

  //function opens notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };
  //function closes  notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  //returns the a different payment info depending on the balance of rent paid
  RenderPaymentInfo() {
    if (this.props.PaymentInfoCard.length !== 0) {
      if (this.props.PaymentInfoCard[0].rentDue > 0) {
        return (
          <div>
            <h1>
              {" "}
              <span className="RedText">
                ${this.props.PaymentInfoCard[0].rentDue}.00
              </span>{" "}
            </h1>
            <p> Due on {this.props.PaymentInfoCard[0].rentDueDate} </p>
            <Button variant="outlined" onClick={this.OpnModal}>
              {" "}
              Pay Now
            </Button>
          </div>
        );
      } else if (this.props.PaymentInfoCard.length === 0) {
        return <p> No Rent Information found</p>;
      } else {
        return (
          <div>
            <h1>
              {" "}
              <span className="GreenText">
                {this.props.PaymentInfoCard[0].rentDue === 0
                  ? "$0.00"
                  : this.props.PaymentInfoCard[0].rentDue.replace("-", "") +
                    ".00"}
              </span>{" "}
            </h1>
            <p> Yay! No rent is Due!</p>
          </div>
        );
      }
    }
  }
  render() {
    return (
      <Card classes={{ root: "CardHeight" }}>
        <CardContent>
          <Typography
            classes={{ root: "CardTitle" }}
            variant="h5"
            component="h2"
          >
            Outstanding Balance
          </Typography>

          <Typography variant="body2" component="p">
            <p>
              {" "}
              <b> Home </b>{" "}
            </p>
            <HomeIcon />
            <div>
              {" "}
              {this.props.results.length <= 0 ? (
                <i>No data found</i>
              ) : (
                <i>
                  {this.props.results[0].street} {this.props.results[0].city},
                  {this.props.results[0].state} {this.props.results[0].zipCode}
                </i>
              )}
              {this.RenderPaymentInfo()}
            </div>
          </Typography>
        </CardContent>

        <SnackBar
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />

        <AnnonModal OpnModal={this.state.OpnModal} CloseModal={this.CloseModal}>
          <PaymentPortalMainPage
            PaymentInfoCard={this.props.PaymentInfoCard}
            OpenNoti={this.OpenNoti}
            CloseModal={this.CloseModal}
            auth={this.props.auth}
            results={this.props.results}
            GetData={this.props.GetPaymentInfo}
          />
        </AnnonModal>
      </Card>
    );
  }
}
