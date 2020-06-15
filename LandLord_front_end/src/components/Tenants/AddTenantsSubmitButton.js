import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
//contains submit button and code to add tenant to DB
export default class AddTenantsSubmitButton extends Component {
  state = { TenantUploadedNoti: false };

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  //function generates a GUID
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //function submit tenant to database
  submit = async (e) => {
    e.preventDefault();
    //triggers parent component to do additional checks
    this.props.UploadSubmitCheck();
    //checks if forms are empty
    if (
      !this.isEmpty(this.props.Tenants.Name) &&
      !this.isEmpty(this.props.Tenants.Email) &&
      !this.isEmpty(this.props.Tenants.Phone) &&
      !this.isEmpty(this.props.Tenants.LeaseDue)
    ) {
      //gets GUID
      var TenGuid = this.uuidv4();
      //builds out tenant object
      var Mydata = {};
      //gets Auth0 ID
      const BearerToken = await this.props.auth.getTokenSilently();
      Mydata.tenant = this.props.Tenants;
      Mydata.tenant.TenGuid = TenGuid;
      console.log(Mydata);

      //makes api call
      var AddRecResults = await Axios.post(
        "https://localhost:5001/api/Tenant/AddTenant",
        Mydata,
        {
          headers: { Authorization: `bearer ${BearerToken}` },
        }
      ).then(
        (AddRecResults) => this.setState({ ReceiptUploadedNoti: true }),
        console.log(AddRecResults),
        //opens Tenant was Uploaded successfully Notification
        this.setState({ TenantUploadedNoti: true }),
        this.props.ClearAddTenantsFormState()
      );
    }
  };
  //closes Tenant was Uploaded successfully Notification
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
              "aria-describedby": "message-id",
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
