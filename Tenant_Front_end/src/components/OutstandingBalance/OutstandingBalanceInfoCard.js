import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import SnackBar from "../SnackBar";
import AnnonModal from "../AnnonModal";
import PaymentPortalMainPage from "../PaymentHistory/PaymentPortalMainPage";
import Axios from "axios";

export default class OutstandingBalanceInfoCard extends Component {
  state = {
    AmountOwned: "5000.00",
    PaymentDueDate: "1/1/2020",
    OpenNoti: "",
    Message: "",
    OpnModal: "",
    PaymentInfo: [],
  };

  componentDidMount() {
    if (this.props.results.length > 0) {
      this.GetData();
    }
  }

  componentDidUpdate() {
    if (this.props.results.length > 0 && this.state.PaymentInfo.length <= 0) {
      this.GetData();
    }
  }

  GetData = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(
      `https://localhost:5001/api/Payment/GetWhenRentDue/${this.props.results[0].email}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        PaymentInfo: results.data,
      })
    );
  };
  OpnModal = () => {
    this.setState({
      OpnModal: true,
    });
  };

  CloseModal = () => {
    this.setState({
      OpnModal: false,
    });
  };

  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
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
            Outstanding Balance
          </Typography>

          <Typography variant="body2" component="p">
            <p>
              {" "}
              <b> Home </b>{" "}
            </p>
            <HomeIcon />
            <p>
              <i>
                {" "}
                {this.props.results.length <= 0 ? (
                  <p>No data found</p>
                ) : (
                  <p>
                    {this.props.results[0].street} {this.props.results[0].city},
                    {this.props.results[0].state}{" "}
                    {this.props.results[0].zipCode}
                  </p>
                )}
              </i>
            </p>
            {this.state.PaymentInfo.length <= 0 ? (
              <p> No Rent Information found</p>
            ) : (
              <div>
                <h1>
                  {" "}
                  <span className="RedText">
                    ${this.state.PaymentInfo[0].rentDue}.00
                  </span>{" "}
                </h1>
                <p> Due on {this.state.PaymentInfo[0].rentDueDate} </p>
                <Button variant="outlined" onClick={this.OpnModal}>
                  {" "}
                  Pay Now
                </Button>
              </div>
            )}
          </Typography>
        </CardContent>

        <SnackBar
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />

        <AnnonModal OpnModal={this.state.OpnModal} CloseModal={this.CloseModal}>
          <PaymentPortalMainPage
            OpenNoti={this.OpenNoti}
            CloseModal={this.CloseModal}
            auth={this.props.auth}
            results={this.props.results}
          />
        </AnnonModal>
      </Card>
    );
  }
}
