import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AnnonModal from "../AnnonModal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PaymentPortalMainPage from "./PaymentPortalMainPage";
import SnackBar from "../SnackBar";
import Fade from "react-reveal/Fade";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";

export default class PaymentHistory extends Component {
  state = {
    Rent: [
      { Month: "Jan 2020", Amount: "1500" },
      { Month: "Feb 2020", Amount: "1500" },
      { Month: "Mar 2020", Amount: "1500" },
      { Month: "Jun 2020", Amount: "1500" },
      { Month: "July 2020", Amount: "1500" },
      { Month: "Aug 2020", Amount: "1500" },
      { Month: "Sept 2020", Amount: "1500" },
      { Month: "Oct 2020", Amount: "1500" },
      { Month: "Nov 2020", Amount: "1500" },
      { Month: "Dec 2020", Amount: "1500" },
    ],

    RentMainTable: [
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
      { DatePaid: "08/14/15", Period: "08/14/15 - 09/14/15", Amount: "1500" },
    ],
    OpenNoti: "",
    Message: "",
    OpnModal: "",
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
      <Fade top opposite>
        <Link to="/">
          <Button variant="outlined" startIcon={<BackspaceIcon />}>
            BACK
          </Button>
        </Link>
        <Paper classes={{ root: "CardFormStyle" }} elevation={10}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h4">
                Total Due is <span className="RedText"> $400 </span>{" "}
              </Typography>
              <Typography variant="body2">Rent Due</Typography>
            </Grid>
            <Grid container item xs={3} justify="flex-end">
              <Button variant="outlined" onClick={this.OpnModal}>
                Pay Now
              </Button>
            </Grid>
          </Grid>

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
              <TableBody>
                {this.state.RentMainTable.map((dataline) => (
                  <TableRow key={dataline.DatePaid}>
                    <TableCell>{dataline.DatePaid}</TableCell>
                    <TableCell>{dataline.Period}</TableCell>
                    <TableCell>${dataline.Amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
            />
          </AnnonModal>
        </Paper>
      </Fade>
    );
  }
}
