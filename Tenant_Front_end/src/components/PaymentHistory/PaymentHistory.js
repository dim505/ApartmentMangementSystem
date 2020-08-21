import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AnnonModal from "../Shared/AnnonModal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PaymentPortalMainPage from "./PaymentPortalMainPage";
import SnackBar from "../Shared/SnackBar";
import Fade from "react-reveal/Fade";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import Axios from "axios";

//this component contains the payment history in detail
export default class PaymentHistory extends Component {
  state = {
    PaymentInfo: [],
    OpenNoti: "",
    Message: "",
    OpnModal: "",
  };

  //opens make payment modal
  OpnModal = () => {
    this.setState({
      OpnModal: true,
    });
  };
  //closes make payment modal
  CloseModal = () => {
    this.setState({
      OpnModal: false,
    });
  };
  //function open alert notification
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };
  //function closes alert notification
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    return (
      <Fade top opposite>
        <Link to="/">
          <Button variant="outlined" startIcon={<BackspaceIcon />}>
            BACK
          </Button>
        </Link>
        <Paper classes={{ root: "CardFormStyle" }} elevation={10}>
          {this.props.PaymentInfoCard[0].rentDue > 0 ? (
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="h4">
                  Total Due is{" "}
                  <span className="RedText">
                    {" "}
                    ${this.props.PaymentInfoCard[0].rentDue}{" "}
                  </span>{" "}
                </Typography>
                <Typography variant="body2">Rent Due</Typography>
              </Grid>
              <Grid container item xs={3} justify="flex-end">
                <Button variant="outlined" onClick={this.OpnModal}>
                  Pay Now
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Typography align="center" variant="h4" gutterBottom>
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
            </Typography>
          )}

          <Paper classes={{ root: "PayHistTitle" }} elevation={5}>
            {" "}
            <Typography align="center" variant="h4" gutterBottom>
              Payment History
            </Typography>
          </Paper>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Date Paid </TableCell>
                  <TableCell>Period </TableCell>
                  <TableCell>Amount </TableCell>
                </TableRow>
              </TableHead>

              {this.props.results.length <= 0 ? (
                <p>No payment history found</p>
              ) : (
                <TableBody>
                  {this.props.PaymentInfoHist.map((dataline) => (
                    <TableRow>
                      <TableCell>{dataline.datePaid} </TableCell>
                      <TableCell>
                        {dataline.firstOfMonth.substring(0, 9)} -{" "}
                        {dataline.lastDateOfMonth.substring(0, 9)}
                      </TableCell>
                      <TableCell>${dataline.amountPaid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <SnackBar
            OpenNoti={this.state.OpenNoti}
            CloseNoti={this.CloseNoti}
            message={this.state.Message}
          />

          <AnnonModal
            OpnModal={this.state.OpnModal}
            CloseModal={this.CloseModal}
          >
            <PaymentPortalMainPage
              OpenNoti={this.OpenNoti}
              CloseModal={this.CloseModal}
              results={this.props.results}
              auth={this.props.auth}
              PaymentInfoCard={this.props.PaymentInfoCard}
              GetData={this.props.GetPaymentInfo}
            />
          </AnnonModal>
        </Paper>
      </Fade>
    );
  }
}
