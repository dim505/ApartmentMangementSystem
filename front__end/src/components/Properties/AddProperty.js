import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bounce from "react-reveal/Bounce";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import AddPropertyForm from './AddPropertyForm'
import Snackbar from "@material-ui/core/Snackbar";
import AddPropertySubmitButton from "./AddPropertySubmitButton"



export default class AddProperty extends Component {
  state = {property : {
          Street: "",
          City: "",
          State: "",
          Unit: "",
          YearlyInsurance: "",
          Tax: ""
  }, UploadBtnCkcOnce: false, FillFormsNoti: false}

  handleChange = (NewState) => {
    this.setState({property: NewState})
  }

  
  isEmpty(str) {
    return (!str || /^\s*$/.test(str));
  }


  UploadSubmitCheck = async () => {

	//checks if forms are empty then reset state accordly 
    if (!this.isEmpty(this.state.property.Street) && 
    !this.isEmpty(this.state.property.City) && 
    !this.isEmpty(this.state.property.State) && 
    !this.isEmpty(this.state.property.YearlyInsurance) && 
    !this.isEmpty(this.state.property.Tax)      
    
    ) {

      await this.setState({
        UploadBtnCkcOnce: false,
        FillFormsNoti: false

        })



    } else {
       await this.setState({
        UploadBtnCkcOnce: true,
        FillFormsNoti: true

        })

    }


  }      


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

        <Link to="/Properties">
          <Button
            variant="contained"
            color="default"
            startIcon={<BackspaceIcon />}
          >
            BACK
          </Button>
        </Link>
        <Bounce top>


          <AddPropertyForm    
            onChanged  = {this.handleChange}   
            UploadBtnCkcOnce = {this.state.UploadBtnCkcOnce}        
                />
          <AddPropertySubmitButton 
            property = {this.state.property}
            UploadSubmitCheck = {this.UploadSubmitCheck}
          />
        </Bounce>
      </div>
    );
  }
}
