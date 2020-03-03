import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class ReceiptRmvButton extends Component {
  state = { OpnWarningBox: false };

  OpenItmRmvNoti = async (id) => {
    this.CloseWarnBox();
        //makes the API call 
    await Axios.delete(`https://amsbackend.azurewebsites.net/api/receipt/delete/${id}`);
    this.props.getReceipts();
    this.props.OpenItmRmvNoti();

  };
  CloseWarnBox = () => {
    this.setState({ OpnWarningBox: false });
  };

  OpenWarnBox = () => {
    this.setState({ OpnWarningBox: true });
  };

  render() {
    return (
      <div>
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
              onClick={() => this.OpenItmRmvNoti(this.props.id)}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={() => this.OpenWarnBox()}
          variant="outlined"
          color="secondary"
        >
          Remove
        </Button>
      </div>
    );
  }
}
