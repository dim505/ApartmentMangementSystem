import React, { Component } from "react";
import AddTenantsForm from "./AddTenantsForm";
import AddTenantsSubmitButton from "./AddTenantsSubmitButton";
import Snackbar from "@material-ui/core/Snackbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Bounce from "react-reveal/Bounce";


//main parent that houses the add tenants page 
export default class AddTenants extends Component {
  constructor (props) {
      super(props);
      this.AddTenantsForm = React.createRef();
  }
  
  state = {
    UploadBtnCkcOnce: false,
    Tenants: [{ Name: "", Email: "", Phone: "", LeaseDue: "", PropertyGuid: "" }]
  };
	//CONTAINS REFERENCE TO CLEAR CHILD COMPONENT STATE 
  ClearAddTenantsFormState = () => {
      this.AddTenantsForm.current.ClearAddTenantsFormState();
  };
//takes state from child component and update its accordly 
  handleChange = NewState => {
     ;
    this.setState({ Tenants: NewState });
  };

	//function to test of function is Empty
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  UploadSubmitCheck = async () => {
	  //checks if forms are empty then reset state accordantly 
    if (
      !this.isEmpty(this.state.Tenants.Name) &&
      !this.isEmpty(this.state.Tenants.Email) &&
      !this.isEmpty(this.state.Tenants.Phone) &&
      !this.isEmpty(this.state.Tenants.LeaseDue)
    ) {
      await this.setState({
        UploadBtnCkcOnce: false,
        FillFormsNoti: false
      });
    } else {
      await this.setState({
        UploadBtnCkcOnce: true,
        FillFormsNoti: true
      });
    }
  };
  
//closes Fill empty forms notification 
  CloseFillFormsNoti() {
    this.setState({
      FillFormsNoti: false
    });
  }
  render() {
    return (
      <div>
        <Bounce top>
          <div className="SnackbarClass">
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              key={{ vertical: "bottom", horizontal: "center" }}
              open={this.state.FillFormsNoti}
              onClose={() => this.CloseFillFormsNoti()}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={
                <span id="message-id">Please Fill Out the Forms in red</span>
              }
            />
          </div>
          <div>
            <Link to="/Tenants">
              <Button
                variant="contained"
                color="default"
                startIcon={<BackspaceIcon />}
              >
                BACK
              </Button>
            </Link>
          </div>
          <AddTenantsForm
            UploadBtnCkcOnce={this.state.UploadBtnCkcOnce}
            onChanged={this.handleChange}
            auth = {this.props.auth}
            ref = {this.AddTenantsForm}
          />
          <AddTenantsSubmitButton
            Tenants={this.state.Tenants}
            UploadSubmitCheck={this.UploadSubmitCheck}
            auth = {this.props.auth}
            ClearAddTenantsFormState = {this.ClearAddTenantsFormState}
            
          />
        </Bounce>
      </div>
    );
  }
}
