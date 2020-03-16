import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//this function contains the receipt modal save button and warning dialog box 
export default class TenantModalSave extends Component {
  state = { OpnSaveWarningBox: false };

	//this function closes the save warning box
  CloseSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: false });
  };
	//this function opens the save warning box 
  OpenSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: true });
  };
	//this function invokes another function to trigger the action of updating of data to server 
  Save = (e) => {
    this.CloseSaveWarnBox();
    this.props.Update(e);
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.OpnSaveWarningBox}
          onClose={() => this.CloseSaveWarnBox()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"!!! WARNING !!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to save edited Property??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseSaveWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={(e) => this.Save(e)}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={() => this.OpenSaveWarnBox()}
          variant="outlined"
          color="primary"
        >
          Save
        </Button>
      </div>
    );
  }
}
