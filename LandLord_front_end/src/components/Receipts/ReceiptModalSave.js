import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DialogBox from "../shared/DialogBox";
import SnackBar from "../shared/SnackBar";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";
//this function contains the receipt modal save button and warning dialog box
export default class ReceiptModalSave extends Component {
  state = { OpnSaveWarningBox: false, OpenNoti: false, Message: "" };

  //function used to open warning box
  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true,
    });
  };
  //function used to close warning box
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  //this function invokes another function to trigger the action of updating of data to server
  Save = (e) => {
    if (
      !isEmpty(document.getElementById("store").value) &&
      !isEmpty(document.getElementById("date").value) &&
      !isEmpty(document.getElementById("tax").value) &&
      !isEmpty(document.getElementById("totalAmount").value)
    ) {
      this.props.Update(e);
    } else {
      this.CloseSaveWarnBox();
      this.OpenNoti(
        "*** COULD NOT UPDATE!!! ***  Please Sure make all fields are not Empty before saving"
      );
    }
  };

  render() {
    return (
      <div>
        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={this.Save}
          message="Are you sure you want to save edited Receipt??"
        />

        <SnackBar
          position="bottom"
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
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
