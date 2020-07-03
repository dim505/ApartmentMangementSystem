import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DialogBox from "../shared/DialogBox";

//this function contains the receipt modal save button and warning dialog box 
export default class TenantModalSave extends Component {
  state = { OpnSaveWarningBox: false
 };


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
  
	//this function invokes another function to trigger the action of updating of data to server 
  Save = (e) => {
    this.CloseSaveWarnBox();
    this.props.Update(e);
  }

  render() {
    return (
      <div>
        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={this.Save}
          message="Are you sure you want to save edited Property??"
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
