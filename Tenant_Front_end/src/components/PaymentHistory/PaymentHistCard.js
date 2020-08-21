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
import Axios from "axios";

//this component contains the payment history in detail
export default class PaymentHistCard extends Component {
  state = {
    PaymentInfo: [],
  };

  //gets data on component mount
  componentDidMount() {
    if (this.props.results.length > 0) {
      this.GetData();
    }
  }
  //gets data on component update if not done so already
  componentDidUpdate() {
    if (this.props.results.length > 0 && this.state.PaymentInfo.length <= 0) {
      this.GetData();
    }
  }
  //API call to get data
  GetData = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/Payment/GetPaymentHistoryInfoCard/${this.props.results[0].email}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        PaymentInfo: results.data,
      })
    );
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

          {this.state.PaymentInfo.length <= 0 ? (
            <p>No payment history found. Please make a payment.</p>
          ) : (
            <div>
              {this.state.PaymentInfo.map((PaymentInfoPerMonth) => (
                <Paper classes={{ root: "RentSummPap" }} elevation={5}>
                  {PaymentInfoPerMonth.shortDate} Rent paid $
                  {PaymentInfoPerMonth.amountPaid}{" "}
                </Paper>
              ))}
              <Typography variant="body2" component="p">
                <Link to="/PaymentHistory">
                  <Button variant="outlined">View History</Button>
                </Link>
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}
