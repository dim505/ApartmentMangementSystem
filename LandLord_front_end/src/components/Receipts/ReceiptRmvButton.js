import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";

//component used to removed receipt (contains remove button and API call to remove )
export default class ReceiptRmvButton extends Component {
  state = { OpnWarningBox: false,ProgessCircle: false };

  OpenItmRmvNoti = async (id) => {
	//OPENS PROGRESS CIRCLE 
   this.setState({

      ProgessCircle: true

    })
	//CLOSES WARNING DIALOG BOX 
    this.CloseWarnBox();
    //makes the API call to delete selected receipt
    const BearerToken = await this.props.auth.getTokenSilently();
    await Axios.delete(`https://amsbackend.azurewebsites.net/api/receipt/delete/${id}`,
    {
      headers: {'Authorization': `bearer ${BearerToken}`}
  
    }
    );
    //refeshes main page again to get new list of receipts
	this.props.getReceipts();
	//opens "item removed" notification 
   this.props.OpenItmRmvNoti();
	//CLOSES PROGRESS CIRCLE 
   this.setState({

    ProgessCircle: false

  })

  };
  //this closes are save warning dialog box
  CloseWarnBox = () => {
    this.setState({ OpnWarningBox: false });
  };

  //opens the save warning dialog box 
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
              Are you sure you want to remove Receipt??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.CloseWarnBox()} color="primary">
              NO
            </Button>
            <Button
              onClick={() => this.OpenItmRmvNoti(this.props.id)}
              color="primary"
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>



        

                    
                    <Button
                      onClick={() => this.OpenWarnBox()}
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
