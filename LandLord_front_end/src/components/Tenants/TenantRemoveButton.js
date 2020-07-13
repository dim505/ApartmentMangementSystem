import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogBox from "../shared/DialogBox";
import Axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
//contains remove  button to delete a tenant
export default class TenantRemoveButton extends Component {
  state = { OpnSaveWarningBox: false };

  async RemoveTenant(guid) {
    const BearerToken = await this.props.auth.getTokenSilently();
    Axios.delete(
      `${process.env.REACT_APP_BackEndUrl}/api/tenant/delete/${guid}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    );
  }

  //opens Tenant was saved notification and closes modal/warning box
  OpenItmRmvNoti = (guid) => {
    this.RemoveTenant(guid);
    this.CloseSaveWarnBox();
    this.props.CloseTenantList();
    this.props.OpenNoti("Tenant Has Been Removed");
    this.props.GetProperties();
    setTimeout(() => {
      this.props.GetTenants();
    }, 500);
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
          Save={() => this.OpenItmRmvNoti(this.props.guid)}
          message="Are you sure you want to remove Tenant??"
        />
        <Tooltip title="Delete" placement="top">
          <DeleteIcon onClick={() => this.OpenSaveWarnBox()} />
        </Tooltip>
      </div>
    );
  }
}
