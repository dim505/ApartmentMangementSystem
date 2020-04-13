import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bounce from "react-reveal/Bounce";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import AddPropertyForm from './AddPropertyForm'
import Snackbar from "@material-ui/core/Snackbar";
import AddPropertySubmitButton from "./AddPropertySubmitButton"
import Grid from '@material-ui/core/Grid';
import AddPropertyAddressSuggest from './AddPropertyAddressSuggest'
import Axios from "axios";

 
//parent component contains  form component and submit button component 
export default class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.AddPropertyForm = React.createRef();
  }
  state = {
    property: {
      Street: "",
      City: "",
      State: "",
      ZipCode: "",
      Unit: "",
      YearlyInsurance: "",
      Tax: ""
    },
    SuggestedAddr: {
      Street: "",
      City: "",
      State: "",
      ZipCode: ""
    },
    UploadBtnCkcOnce: false,
    FillFormsNoti: false,
    SuggestedAddresses: [],
    SuggAddrChecked: false,
    CheckSuggAddrNoti: false,
    ClearAddPropertyFormState: false
  };

 //this is a reference to AddPropertyForm clear state function that is triggered by the submit button 
  ClearAddPropertyFormState = () => {
    this.AddPropertyForm.current.ClearAddPropertyFormState();
  };
  //receives state from child compoent then it updates the properties object that will eventaully get fed to submit compoenet 
  handleChange = NewState => {
     ;
    this.setState({ property: NewState });
    if (!this.state.SuggAddrChecked) {
      this.GetSuggestedAddresses();
    }
  };

  UpdateSuggAddr = () => {
     ;
    if (window.SuggestedAddress[0].address.houseNumber === undefined) {
      window.SuggestedAddress[0].address.houseNumber = "";
    }
    var street = window.SuggestedAddress[0].address.houseNumber;
    street += " ";
    street += window.SuggestedAddress[0].address.street;
    this.setState({
      SuggestedAddr: {
        Street: street,
        City: window.SuggestedAddress[0].address.city,
        State: window.SuggestedAddress[0].address.state,
        ZipCode: window.SuggestedAddress[0].address.postalCode
      }
    });
  };

  //tracks whether a checkbox is activly being checked 
  SuggAddrChecked = checked => {
    this.setState({ SuggAddrChecked: checked });
  };

  //function responsible for getting address suggestions 
  GetSuggestedAddresses = async () => {
	//this builds out the address query 
    var query = [];
    if (this.state.property.Street.length > 0) {
      query.push(this.state.property.Street);
    }
    if (this.state.property.City.length > 0) {
      query.push(" ");
      query.push(this.state.property.City);
    }
    if (this.state.property.State.length > 0) {
      query.push(" ");
      query.push(this.state.property.State);
    }

    if (this.state.property.ZipCode.length > 0) {
      query.push(" ");
      query.push(this.state.property.ZipCode);
    }

    query = query.join("");

    console.log(query);
    //gets logged in user ID 
    const BearerToken = await this.props.auth.getTokenSilently();
  	//makes the API call to gets the suggestions 
    var result = await Axios.get(
      "https://localhost:5001/api/property/GetSuggestedPropertiesAddress",

      {
        headers: {'Authorization': `bearer ${BearerToken}`},
        params: {

          query: query,

        }
      }

      
    ).then( (result) =>

      {

        
        this.setState({ SuggestedAddresses: result.data.suggestions })
      
      
        }
      );



  };
	//function to test if any of the forms are empty
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }
//This does some checks and sets the appropiate flags if the forms are empty when trying to submit 
  UploadSubmitCheck = async () => {
    if (!this.state.SuggAddrChecked) {
      this.setState({
        UploadBtnCkcOnce: true,
        CheckSuggAddrNoti: true
      });
    } else {
      //checks if forms are empty then reset state accordly
      if (
        !this.isEmpty(this.state.property.Unit) &&
        !this.isEmpty(this.state.property.YearlyInsurance) &&
        !this.isEmpty(this.state.property.Tax)
      ) {
        await this.setState({
          UploadBtnCkcOnce: false,
          FillFormsNoti: false
        });
      } else {
		//UploadBtnCkcOnce : checks if upload button clicked once 
		//FillFormsNoti: opens notification tell user to fill in blank forms 
        await this.setState({
          UploadBtnCkcOnce: true,
          FillFormsNoti: true
        });
      }
    }
  };
  
		//closes fill empty forms notification t
  CloseFillFormsNoti() {
    this.setState({
      FillFormsNoti: false
    });
  }
	//closes the "Please Check off a Suggested Address " notification 
  CloseCheckSuggAddrNoti() {
    this.setState({
      CheckSuggAddrNoti: false
    });
  }
  
  
	//clears the state for everything 
  ClearState = () => {
    this.setState({
      property: {
        Street: "",
        City: "",
        State: "",
        ZipCode: "",
        Unit: "",
        YearlyInsurance: "",
        Tax: ""
      },
      SuggestedAddr: {
        Street: "",
        City: "",
        State: "",
        ZipCode: ""
      },
      UploadBtnCkcOnce: false,
      FillFormsNoti: false,
      SuggestedAddresses: [],
      SuggAddrChecked: false,
      CheckSuggAddrNoti: false,
      ClearAddPropertyFormState: true
    });
    window.SuggestedAddress = [];
    window.SuggestedAddresses = [];
  };
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
            message={
              <span id="message-id">Please Fill Out the Forms in red</span>
            }
          />

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            key={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.CheckSuggAddrNoti}
            onClose={() => this.CloseCheckSuggAddrNoti()}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <span id="message-id">Please Check off a Suggested Address </span>
            }
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
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <AddPropertyForm
                onChanged={this.handleChange}
                UploadBtnCkcOnce={this.state.UploadBtnCkcOnce}
                SuggestedAddr={this.state.SuggestedAddr}
                SuggAddrChecked={this.state.SuggAddrChecked}
                ref = {this.AddPropertyForm}
              />
              <AddPropertySubmitButton
                property={this.state.property}
                UploadSubmitCheck={this.UploadSubmitCheck}
                SuggAddrChecked={this.state.SuggAddrChecked}
                ClearState={this.ClearState}
                ClearAddPropertyFormState = {this.ClearAddPropertyFormState}
                auth = {this.props.auth}
                SuggestedAddr = {this.state.SuggestedAddr}
                
              />
            </Grid>
            <Grid item xs={6}>
              <AddPropertyAddressSuggest
                SuggestedAddresses={this.state.SuggestedAddresses}
                UpdateSuggAddr={this.UpdateSuggAddr}
                SuggAddrChecked={this.SuggAddrChecked}
                            />
            </Grid>
          </Grid>
        </Bounce>
      </div>
    );
  }
}
