import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//contains button and action used to remove a property from database
export default class PropertyRemoveButton extends Component {
  state = { OpnWarningBox: false };

  //opens the property was successfully removed notification
  OpenPropertyRmvNoti = async (id) => {
    this.CloseWarnBox();
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes the API call to delete selected receipt
    await Axios.delete(`https://localhost:5001/api/property/delete/${id}`, {
      headers: { Authorization: `bearer ${BearerToken}` },
    });
    //refeshes main page again to get new list of receipts
    this.props.GetProperties();
    //opens "item removed" notification
    this.props.OpenPropertyRmvNoti();
  };
  //this closes are save warning dialog box
  CloseWarnBox = () => {
    this.setState({ OpnWarningBox: false });
  };

  //opens the save warning dialog box
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
              Are you sure you want to remove Property??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={() => this.OpenPropertyRmvNoti(this.props.guid)}
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
