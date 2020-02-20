import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import DatePicker from "react-date-picker";
import NumericInput from "react-numeric-input";
import Axios from "axios";

export default class Receipt extends Component {
  state = {
    Receipts: [
      {
        id: "1",
        Date: "1/1/90",
        Store: "Home Depot",
        Tax: "4",
        TotalAmount: "20",
        Image: "123"
      },
      {
        id: "2",
        Date: "2/1/90",
        Store: "Lowes",
        Tax: "4",
        TotalAmount: "20",
        Image: "123"
      },
      {
        id: "3",
        Date: "3/1/90",
        Store: "BJ",
        Tax: "4",
        TotalAmount: "20",
        Image: "123"
      }
    ],
    ReceiptFilterd: [],
    OpnWarningBox: false,
    OpnModal: false,
    OpenSnackBar: false,
    OpenItmRmvNoti: false
  };

  async componentDidMount() {
    this.getReceipts();
  }

  async getReceipts() {
    // var results = await Axios({
    //  url: "https://amsbackend.azurewebsites.net/api/receipt"
    // }).then(console.log(() => results));
  }

  CloseWarnBox = () => {
    this.setState({ OpnWarningBox: false });
  };

  OpenWarnBox = () => {
    this.setState({ OpnWarningBox: true });
  };

  OpenModal = id => {
    debugger;
    var ReceiptFilterd = this.state.Receipts.filter(
      Receipt => (Receipt.id = id)
    );
    this.setState({ OpnModal: true, ReceiptFilterd: ReceiptFilterd });
  };

  CloseModal = () => {
    this.setState({ OpnModal: false });
  };

  OpenSnackBar = () => {
    this.setState({ OpenSnackBar: true });
  };

  CloseSnackBar = () => {
    this.setState({ OpenSnackBar: false });
  };

  OpenItmRmvNoti = () => {
    this.setState({ OpenItmRmvNoti: true });
  };

  CloseItmRmvNoti = () => {
    this.setState({ OpenItmRmvNoti: false });
  };

  render() {
    return (
      <div>
        <Link to="/AddReceipt">
          <Button className="ReceiptAddBtn" variant="outlined" color="primary">
            ADD New Receipt
          </Button>
        </Link>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenSnackBar}
          onClose={() => this.CloseSnackBar()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Item Updated</span>}
        />

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenItmRmvNoti}
          onClose={() => this.CloseItmRmvNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Item Removed</span>}
        />

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.OpnModal}
          onClose={() => this.CloseModal()}
        >
          <div className="ModalStyle">
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <Typography id="OrdSummTitle" variant="h4">
                      All Receipts
                    </Typography>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date </TableCell>
                    <TableCell>Store </TableCell>
                    <TableCell>Tax </TableCell>
                    <TableCell>Total Amount </TableCell>
                    <TableCell>Image </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.ReceiptFilterd.map(Receipt => (
                    <TableRow key={Receipt.id}>
                      <TableCell align="right">
                        {" "}
                        <DatePicker
                          selected={Receipt.Date}
                          disableCalendar={true}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={Receipt.Store} />
                      </TableCell>
                      <TableCell align="right">
                        <NumericInput
                          id="NumInputstyle"
                          strict={true}
                          min={0}
                          max={999999}
                          value={Receipt.Tax}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <NumericInput
                          id="NumInputstyle"
                          strict={true}
                          min={0}
                          max={999999}
                          value={Receipt.TotalAmount}
                        />
                      </TableCell>
                      <TableCell align="right">${Receipt.Image}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => this.OpenModal()}
                          variant="outlined"
                          color="primary"
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Modal>

        <Dialog
          open={this.state.OpnWarningBox}
          onClose={() => this.CloseWarnBox()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"!!! WARNING !!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove Receipt??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={() => this.CloseWarnBox()}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <Typography id="OrdSummTitle" variant="h4">
                  All Receipts
                </Typography>
              </TableRow>
              <TableRow>
                <TableCell>Date </TableCell>
                <TableCell>Store </TableCell>
                <TableCell>Tax </TableCell>
                <TableCell>Total Amount </TableCell>
                <TableCell>Image </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.Receipts.map(Receipt => (
                <TableRow key={Receipt.id}>
                  <TableCell align="right">{Receipt.Date}</TableCell>
                  <TableCell align="right">{Receipt.Store}</TableCell>
                  <TableCell align="right">${Receipt.Tax}</TableCell>
                  <TableCell align="right">${Receipt.TotalAmount}</TableCell>
                  <TableCell align="right">${Receipt.Image}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => this.OpenModal(Receipt.id)}
                      variant="outlined"
                      color="primary"
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button
                      onClick={() => this.OpenWarnBox()}
                      variant="outlined"
                      color="secondary"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
