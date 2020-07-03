import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Axios from "axios";
import SnackBar from "../shared/SnackBar";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";
//contains submit button and code to add tenant to DB
export default class AddTenantsSubmitButton extends Component {
  state = { OpenNoti: false, Message: "" };

  //function submit tenant to database
  submit = async (e) => {
    e.preventDefault();
    //triggers parent component to do additional checks
    this.props.UploadSubmitCheck();
    //checks if forms are empty
    if (
      !isEmpty(this.props.Tenants.Name) &&
      !isEmpty(this.props.Tenants.Email) &&
      !isEmpty(this.props.Tenants.Phone) &&
      !isEmpty(this.props.Tenants.LeaseDue) &&
      !isEmpty(this.props.Tenants.RentDue)
    ) {
      //gets GUID
      var TenGuid = uuidv4();
      //builds out tenant object
      var Mydata = {};
      //gets Auth0 ID
      const BearerToken = await this.props.auth.getTokenSilently();
      Mydata.tenant = this.props.Tenants;
      Mydata.tenant.TenGuid = TenGuid;
      console.log(Mydata);

      //makes api call
      var AddRecResults = Axios.post(
        `${process.env.REACT_APP_BackEndUrl}/api/Tenant/AddTenant`,
        Mydata,
        {
          headers: { Authorization: `bearer ${BearerToken}` },
        }
      )
        .catch(async (AddRecResults) => {
          if (AddRecResults !== undefined) {
            await this.OpenNoti(
              "Duplicate Email. Please Choose Another Email."
            );
          }
        })

        .then((AddRecResults) => {
          if (this.state.OpenNoti === false) {
            //opens Tenant was Uploaded successfully Notification
            this.OpenNoti("Tenant Added");
            this.props.ClearAddTenantsFormState();
          }
        });
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
        <div className="SnackbarClass">
          <SnackBar
            position="bottom"
            OpenNoti={this.state.OpenNoti}
            CloseNoti={this.CloseNoti}
            message={this.state.Message}
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
