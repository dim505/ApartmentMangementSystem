import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

export default class AddTenantsSubmitButton extends Component {
  state = { TenantUploadedNoti: false };

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  submit = async e => {
    debugger;
    e.preventDefault();
    this.props.UploadSubmitCheck();

    if (
      !this.isEmpty(this.props.Tenants.Name) &&
      !this.isEmpty(this.props.Tenants.Email) &&
      !this.isEmpty(this.props.Tenants.Phone) &&
      !this.isEmpty(this.props.Tenants.LeaseDue)
    ) {
      var Mydata = {};

      Mydata.tenant = this.props.Tenants;

      console.log(Mydata);
      const headers = {
        "Content-Type": "application/json"
      };

      var AddRecResults = await Axios.post(
        "https://localhost:5001/api/Tenant/AddTenant",
        Mydata,
        headers
      ).then(
        AddRecResults => this.setState({ ReceiptUploadedNoti: true }),
        console.log(AddRecResults),
        this.setState({ TenantUploadedNoti: true })
      );
    }
  };

  CloseTenantUploadedNoti() {
    this.setState({ TenantUploadedNoti: false });
  }

  render() {
    return (
      <div>
        <div className="SnackbarClass">
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            key={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.TenantUploadedNoti}
            onClose={() => this.CloseTenantUploadedNoti()}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Tenant Added</span>}
          />
        </div>

        <Button
          onClick={this.submit}
          type="submit"
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >
          Add Tenant
        </Button>
      </div>
    );
  }
}
