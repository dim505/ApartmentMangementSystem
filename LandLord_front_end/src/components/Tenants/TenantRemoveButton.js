import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';

//contains remove  button to delete a tenant  
export default class TenantRemoveButton extends Component {
  state = { OpnWarningBox: false };

  async RemoveTenant (guid) {
		const BearerToken = await this.props.auth.getTokenSilently();
     Axios.delete(`https://amsbackend.azurewebsites.net/api/tenant/delete/${guid}`,
	     {
      headers: {'Authorization': `bearer ${BearerToken}`}
  
    }
	 );
	

  }

//opens Tenant was saved notification and closes modal/warning box 
  OpenItmRmvNoti = (guid) => {
    this.RemoveTenant(guid)
    this.CloseWarnBox();
    this.props.OpenTenantRmvNoti();
    this.props.GetProperties();
    this.props.GetTenants();
  };
  
  //closes warning save YES/no box 
  CloseWarnBox = () => {
    this.setState({ OpnWarningBox: false });
  };
	//opens warning save YES/no box
  OpenWarnBox = () => {
    this.setState({ OpnWarningBox: true });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.OpnWarningBox}
          onClose={() => this.CloseWarnBox()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"!!! WARNING !!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove Tenant??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={() => this.OpenItmRmvNoti(this.props.guid)}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Delete" placement="top">
        <DeleteIcon onClick={() => this.OpenWarnBox()} />
        </Tooltip>
      </div>
    );
  }
}
