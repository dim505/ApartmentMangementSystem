import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import DialogBox from "../shared/DialogBox";

//contains button and action used to remove a property from database
export default class PropertyRemoveButton extends Component {
  state = { OpnSaveWarningBox: false };

  //opens the property was successfully removed notification
  OpenPropertyRmvNoti = async (id) => {
    this.CloseSaveWarnBox();
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes the API call to delete selected receipt
    await Axios.delete(
      `${process.env.REACT_APP_BackEndUrl}/api/property/delete/${id}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    );
    //refeshes main page again to get new list of receipts
    this.props.GetProperties();
    //opens "item removed" notification
    this.props.OpenPropertyRmvNoti("Property Removed");
  };
  //closes warning box
  OpenSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: true,
    });
  };

  //opens warningbox
  CloseSaveWarnBox = () => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  render() {
    return (
      <div>
        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={() => this.OpenPropertyRmvNoti(this.props.guid)}
          message="Are you sure you want to remove property?"
        />

        <Button
          onClick={() => this.OpenSaveWarnBox()}
          variant="outlined"
          color="secondary"
        >
          Remove
        </Button>
      </div>
    );
  }
}
