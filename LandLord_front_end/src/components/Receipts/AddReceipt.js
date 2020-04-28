import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bounce from "react-reveal/Bounce";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import UploadReceiptBtn from "./uploadReceiptBtn";
import AddReceiptForm from './AddReceiptForm';
import Snackbar from "@material-ui/core/Snackbar";

//parent component contains forms and submit button for add receipt page 
export default class Receipt extends Component {
  constructor(props) {
      super(props);
      this.AddReceiptForm = React.createRef();
  }
  
  state = {receipt: {Date: "",Store: "",Tax: "", TotalAmount: "" }, UploadBtnCkcOnce: false, FillFormsNoti: false}

	//contains reference to child component function ClearAddReceiptFormState so it can be triggered to clear state when of form when submit button is clicked 
  ClearAddReceiptFormState = () => {
    this.AddReceiptForm.current.ClearAddReceiptFormState();


  }
	//takes state from child component and update its accordingly 
  handleChange = (NewState) => {
    this.setState({receipt: NewState})
  }



  isEmpty(str) {
    return (!str || /^\s*$/.test(str));
  }


  UploadSubmitCheck = async () => {

	//checks if forms are empty then reset state accordingly 
    if (!this.isEmpty(this.state.receipt.Date) && 
    !this.isEmpty(this.state.receipt.Store) &&
    !this.isEmpty(this.state.receipt.Tax) &&
    !this.isEmpty(this.state.receipt.TotalAmount) 
    
    ) {
		//
      await this.setState({
        UploadBtnCkcOnce: false,
        FillFormsNoti: false

        })



    } else {
		//opens the appropriate notifications 
       await this.setState({
        UploadBtnCkcOnce: true,
        FillFormsNoti: true

        })

    }


  }       
	//closes Fill empty forms notification 
  CloseFillFormsNoti() {

     this.setState({
      FillFormsNoti: false
      })
  }

  render() {
    return (
      <div>
        <div className="SnackbarClass">  
          <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.FillFormsNoti}
          onClose={() => this.CloseFillFormsNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Please Fill Out the Forms in red</span>}
        />
      </div>

        <Link to="/Receipt">
          <Button
            variant="contained"
            color="default"
            startIcon={<BackspaceIcon />}
          >
            BACK
          </Button>
        </Link>
        <Bounce top>


          <AddReceiptForm 
                onChanged = {this.handleChange}
                UploadBtnCkcOnce = {this.state.UploadBtnCkcOnce}
                ref = {this.AddReceiptForm}
                
                />
          <UploadReceiptBtn
              receipt = {this.state.receipt}  
              UploadSubmitCheck = {this.UploadSubmitCheck}  
              UploadBtnCkcOnce = {this.state.UploadBtnCkcOnce}
              FillFormsNoti = {this.state.FillFormsNoti}
              auth = {this.props.auth}
              ClearAddReceiptFormState = {this.ClearAddReceiptFormState}
              

          />
        </Bounce>
      </div>
    );
  }
}
