import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Axios from "axios";

//child component of add property page - contains submit button and action to add property
export default class AddPropertySubmitButton extends Component {
  state = { SubmitSuccessNoti: false };

  //GENERATES A NEW UNIQUE id FOR PROPERTY
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //FUNCTION TO CHECK IF FORM IS EMPTY
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }
  //SUBMIT post api call to create property
  async submit() {
    //this does addition checks in the parent component
    this.props.UploadSubmitCheck();

    //checks if all fields in the add property form are filled
    if (
      this.props.SuggAddrChecked &&
      !this.isEmpty(this.props.property.Unit) &&
      !this.isEmpty(this.props.property.YearlyInsurance) &&
      !this.isEmpty(this.props.property.Tax)
    ) {
      const BearerToken = await this.props.auth.getTokenSilently();

      //generates ID for property
      var Guid = this.uuidv4();
      //creates JSON Object
      var Mydata = {};
      var query =
        this.props.SuggestedAddr.Street +
        " " +
        this.props.SuggestedAddr.City +
        " " +
        this.props.SuggestedAddr.State +
        " " +
        this.props.SuggestedAddr.ZipCode;

      //makes api call to get all properties
      var results = await Axios.get(
        "https://amsbackend.azurewebsites.net/api/property/GetSuggestedPropertiesLatLng",
        {
          headers: { Authorization: `bearer ${BearerToken}` },
          params: {
            query: query,
          },
        }
      ).then(
        (results) => (window.AddressPosition = results.data.items[0].position)
      );

      Mydata.property = {
        City: this.props.SuggestedAddr.City,
        State: this.props.SuggestedAddr.State,
        Street: this.props.SuggestedAddr.Street,
        ZipCode: this.props.SuggestedAddr.ZipCode,
        Tax: this.props.property.Tax,
        Unit: this.props.property.Unit,
        YearlyInsurance: this.props.property.YearlyInsurance,
        Guid: Guid,
        Lat: window.AddressPosition.lat,
        Lng: window.AddressPosition.lng,
      };

      console.log(Mydata);

      //makes api call
      var Results = await Axios.post(
        "https://amsbackend.azurewebsites.net/api/Property/AddProperty",
        Mydata,
        {
          headers: { Authorization: `bearer ${BearerToken}` },
        }
      ).then((Results) => console.log(Results));
      //opens upload success notification
      this.setState({ SubmitSuccessNoti: true });
      //clears state to clear out the forms
      this.props.ClearState();
      this.props.ClearAddPropertyFormState();
    } else {
      //sets upload success notification to false
      this.setState({ SubmitSuccessNoti: false });
    }
  }
  //function closes upload success notification
  CloseSubmitSuccessNoti() {
    this.setState({ SubmitSuccessNoti: false });
  }

  render() {
    return (
      <div>
        <div className="SnackbarClass">
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            key={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.SubmitSuccessNoti}
            onClose={() => this.CloseSubmitSuccessNoti()}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">Property Added</span>}
          />
        </div>

        <Button
          onClick={() => this.submit()}
          variant="outlined"
          color="primary"
        >
          Submit Property
        </Button>
      </div>
    );
  }
}
