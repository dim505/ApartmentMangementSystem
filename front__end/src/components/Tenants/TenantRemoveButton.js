import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from 'axios';

export default class TenantRemoveButton extends Component {
  state = { OpnWarningBox: false };

  RemoveTenant (guid) {
    
     Axios.delete(`https://amsbackend.azurewebsites.net/api/tenant/delete/${guid}`);


  }


  OpenItmRmvNoti = (guid) => {
    this.RemoveTenant(guid)
    this.CloseWarnBox();
    this.props.OpenTenantRmvNoti();
    this.props.GetProperties();
    this.props.GetTenants();
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
              Are you sure you want to remove Tenant??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={() => this.OpenItmRmvNoti(this.props.guid)}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>

        <DeleteIcon onClick={() => this.OpenWarnBox()} />
      </div>
    );
  }
}
