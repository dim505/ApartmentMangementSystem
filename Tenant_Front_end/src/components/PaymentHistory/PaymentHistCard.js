import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

export default class PaymentHistCard extends Component {
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
            Payment History
          </Typography>

          {this.state.Rent.map((RentPerMonth) => (
            <Paper classes={{ root: "RentSummPap" }} elevation={5}>
              Rent {RentPerMonth.Month} paid ${RentPerMonth.Amount}{" "}
            </Paper>
          ))}

          <Typography variant="body2" component="p">
            <Link to="/PaymentHistory">
              <Button variant="outlined">View History</Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
