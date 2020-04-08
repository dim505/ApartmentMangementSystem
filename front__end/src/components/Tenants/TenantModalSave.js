import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

//contains save button for modal 
export default class TenantModalSave extends Component {
  state = { OpnSaveWarningBox: false };
	//closes warning save YES/no box 
  CloseSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: false });
  };
	//opens warning save YES/no box
  OpenSaveWarnBox = () => {
    this.setState({ OpnSaveWarningBox: true });
  };

//function handles the updating of a tenant 
  update = async (e) => {
      e.preventDefault();
	//builds out object
	 var Mydata = {}
      
	  var tenant = {
        
        name : document.getElementById("name").value, 
        email : document.getElementById("email").value, 
        phone: document.getElementById("phone").value, 
        leaseDue : document.getElementById("leaseDue").value, 
        guid : this.props.TenantsFiltered[0].guid,
        tenGuid: this.props.TenantsFiltered[0].tenGuid
        
        
      }
	  //gets auth0 token 
	  const BearerToken = await this.props.auth.getTokenSilently();
      Mydata.tenant = tenant

      console.log(Mydata)
	  //makes API call 
      var results = Axios.post("https://localhost:5001/api/tenant/UpdateTenant",Mydata,
      {
        headers: {'Authorization': `bearer ${BearerToken}`}
    
      }
      )
      .then(results => console.log(results))


        }
	//opens Tenant was saved notification and closes modal/warning box 
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
