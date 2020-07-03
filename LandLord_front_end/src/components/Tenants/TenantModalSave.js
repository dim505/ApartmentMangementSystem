import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SnackBar from "../shared/SnackBar";
import DialogBox from "../shared/DialogBox";
import Axios from "axios";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";

//contains save button for modal
export default class TenantModalSave extends Component {
  state = {
    OpenNoti: false,
    Message: "",
    OpnSaveWarningBox: false,
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

  //function handles the updating of a tenant
  update = async (e) => {
    e.preventDefault();
    //builds out object
    var Mydata = {};

    var tenant = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      rentDue: document.getElementById("rentDue").value,
      phone: document.getElementById("phone").value,
      leaseDue: document.getElementById("leaseDue").value,
      guid: this.props.TenantsFiltered[0].guid,
      tenGuid: this.props.TenantsFiltered[0].tenGuid,
    };
    //gets auth0 token
    const BearerToken = await this.props.auth.getTokenSilently();
    Mydata.tenant = tenant;

    console.log(Mydata);
    //makes API call
    var results = Axios.post(
      `${process.env.REACT_APP_BackEndUrl}/api/tenant/UpdateTenant`,
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => {
      this.props.GetProperties();
      this.props.GetTenants();
    });
  };
  //opens Tenant was saved notification and closes modal/warning box
  OpenTenantSaveNoti = (e) => {
    if (
      !isEmpty(document.getElementById("name").value) &&
      !isEmpty(document.getElementById("email").value) &&
      !isEmpty(document.getElementById("phone").value.replace("+", "")) &&
      !isEmpty(document.getElementById("leaseDue").value) &&
      !isEmpty(document.getElementById("rentDue").value)
    ) {
      this.CloseSaveWarnBox();
      this.props.CloseModal();
      this.update(e);
      this.props.OpenTenantSaveNoti("Tenants Has Been Updated");
      this.props.CloseTenantList();
    } else {
      this.CloseSaveWarnBox();
      this.OpenNoti(
        "*** COULD NOT UPDATE!!! *** Please Sure make all fields are not Empty before saving"
      );
    }
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

  render() {
    return (
      <div>
        <DialogBox
          OpnSaveWarningBox={this.state.OpnSaveWarningBox}
          CloseSaveWarnBox={this.CloseSaveWarnBox}
          Save={(e) => this.OpenTenantSaveNoti(e)}
          message="Are you sure you want to save edited Tenants??"
        />

        <SnackBar
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
