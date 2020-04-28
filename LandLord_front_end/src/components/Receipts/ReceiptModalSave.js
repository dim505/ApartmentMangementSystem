import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";

//this function contains the receipt modal save button and warning dialog box 
export default class ReceiptModalSave extends Component {
  state = { OpnSaveWarningBox: false,
    OpenReceiptFieldsEmptyNoti: false };

	//this function closes the save warning box
  CloseSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: false });
  };
	//this function opens the save warning box 
  OpenSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: true });
  };

  //this function closes the save warning box
  OpenReceiptFieldsEmptyNoti = () => {
    this.setState({ OpenReceiptFieldsEmptyNoti: true });
  };
  //this function opens the save warning box 
  CloseReceiptFieldsEmptyNoti = () => {
    this.setState({ OpenReceiptFieldsEmptyNoti: false });
  };


  isEmpty(str) {
    return (!str || /^\s*$/.test(str));
  }

	//this function invokes another function to trigger the action of updating of data to server 
  Save = (e) => {


   if (
    !this.isEmpty(document.getElementById("store").value) &&

   !this.isEmpty(document.getElementById("date").value) &&
   !this.isEmpty(document.getElementById("tax").value) &&
   !this.isEmpty(document.getElementById("totalAmount").value)
   ) {
    this.props.Update(e);

   } else {
    this.CloseSaveWarnBox()
    this.OpenReceiptFieldsEmptyNoti()



   }


    
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
              Are you sure you want to save edited Receipt??
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

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenReceiptFieldsEmptyNoti}
          onClose={() => this.CloseReceiptFieldsEmptyNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">*** COULD NOT UPDATE!!! ***  Please Sure make all fields are not Empty before saving </span>}
        />
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
