import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default class TenantModalSave extends Component {
  state = { OpnSaveWarningBox: false };

  CloseSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: false });
  };

  OpenSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: true });
  };

  update = (e) => {
      e.preventDefault();
      var Mydata = {}
      var tenant = {
        
        name : document.getElementById("name").value, 
        email : document.getElementById("email").value, 
        phone: document.getElementById("phone").value, 
        leaseDue : document.getElementById("leaseDue").value, 
        guid : this.props.TenantsFiltered[0].guid,
        tenGuid: this.props.TenantsFiltered[0].tenGuid
        
        
      }


      Mydata.tenant = tenant
      const headers = {
        'Content-Type' : 'application/json'
      }
      console.log(Mydata)
      var results = Axios.post("https://amsbackend.azurewebsites.net/api/tenant/UpdateTenant",Mydata,headers)
      .then(results => console.log(results))


        }

  OpenTenantSaveNoti = (e) => {
    this.CloseSaveWarnBox();
    this.props.CloseModal();
    this.update(e);
    this.props.OpenTenantSaveNoti();
    this.props.CloseTenantList();
    this.props.GetProperties();
    this.props.GetTenants();

  };
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
              Are you sure you want to save edited Tenants??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseSaveWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={(e) => this.OpenTenantSaveNoti(e)}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>

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
