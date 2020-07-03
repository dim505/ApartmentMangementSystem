import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import DialogBox from "../shared/DialogBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

//component used to removed receipt (contains remove button and API call to remove )
export default class ReceiptRmvButton extends Component {
  state = { OpnWarningBox: false, ProgessCircle: false };

  OpenItmRmvNoti = async (id) => {
    //OPENS PROGRESS CIRCLE
    this.setState({
      ProgessCircle: true,
    });
    //CLOSES WARNING DIALOG BOX
    this.CloseSaveWarnBox();
    //makes the API call to delete selected receipt
    const BearerToken = await this.props.auth.getTokenSilently();
    await Axios.delete(
      `${process.env.REACT_APP_BackEndUrl}/api/receipt/delete/${id}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    );
    //refeshes main page again to get new list of receipts
    this.props.getReceipts();
    //opens "item removed" notification
    this.props.OpenItmRmvNoti("Item Removed");
    //CLOSES PROGRESS CIRCLE
    this.setState({
      ProgessCircle: false,
    });
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
          Save={() => this.OpenItmRmvNoti(this.props.id)}
          message="Are you sure you want to remove Receipt?"
        />

        <Button
          onClick={() => this.OpenSaveWarnBox()}
          variant="outlined"
          color="secondary"
        >
          Remove
        </Button>

        {this.state.ProgessCircle && (
          <div className="ProgessCircle">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}
