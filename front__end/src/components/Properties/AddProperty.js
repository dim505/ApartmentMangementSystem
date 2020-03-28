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

/*APP ID
 X3DNOax14C45YOpU9GoF 

API Key
9d8ZRC1pU-evNyqlQKlVSFrcQ9HnsaGLGU8OTEdsWwc



https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=X3DNOax14C45YOpU9GoF&app_code=9d8ZRC1pU-evNyqlQKlVSFrcQ9HnsaGLGU8OTEdsWwc&query=1

https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json
?apiKey=9d8ZRC1pU-evNyqlQKlVSFrcQ9HnsaGLGU8OTEdsWwc
&query=12+verde+drive+greenfield+ma
*/
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
    this.GetSuggestedAddresses()
  
  }

//'app_id': 'X3DNOax14C45YOpU9GoF',
  GetSuggestedAddresses = () => {
      var query =  this.state.property.Street
      console.log(query)
      var result = Axios.get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json', {
      'params': {
            
            'apiKey': `rFWVaP56x9m5GN_mD-1ai8S2uBFl73CJrsPLS38OwZ8`,
            'query': query
      }})
        .then( (result) => 
              console.log(result.data.suggestions)

         )



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

        <Grid container spacing={1}>
          <Grid xs={6}>  
          <AddPropertyForm    
            onChanged  = {this.handleChange}   
            UploadBtnCkcOnce = {this.state.UploadBtnCkcOnce}        
                />
          <AddPropertySubmitButton 
            property = {this.state.property}
            UploadSubmitCheck = {this.UploadSubmitCheck}
          />
          </Grid >
          <Grid xs={6}>  
          <AddPropertyAddressSuggest />            
            </Grid> 


        </Grid>
        </Bounce>
      </div>
    );
  }
}
