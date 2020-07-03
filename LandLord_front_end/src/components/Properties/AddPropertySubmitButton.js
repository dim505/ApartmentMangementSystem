import React, { Component } from "react";
import SnackBar from "../shared/SnackBar";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";

//child component of add property page - contains submit button and action to add property
export default class AddPropertySubmitButton extends Component {
  state = { OpenNoti: false, Message: "" };

  //SUBMIT post api call to create property
  async submit() {
    //this does addition checks in the parent component
    this.props.UploadSubmitCheck();

    //checks if all fields in the add property form are filled
    if (
      this.props.SuggAddrChecked &&
      !isEmpty(this.props.property.Unit) &&
      !isEmpty(this.props.property.YearlyInsurance) &&
      !isEmpty(this.props.property.Tax)
    ) {
      const BearerToken = await this.props.auth.getTokenSilently();

      //generates ID for property
      var Guid = uuidv4();
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
        `${process.env.REACT_APP_BackEndUrl}/api/property/GetSuggestedPropertiesLatLng`,
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
        `${process.env.REACT_APP_BackEndUrl}/api/Property/AddProperty`,
        Mydata,
        {
          headers: { Authorization: `bearer ${BearerToken}` },
        }
      ).then((Results) => console.log(Results));
      //opens upload success notification
      this.OpenNoti("Property Added");
      //clears state to clear out the forms
      this.props.ClearState();
      this.props.ClearAddPropertyFormState();
    } else {
      //sets upload success notification to false
      this.setState({ OpenNoti: false });
    }
  }

  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    return (
      <div>
        <div className="SnackbarClass">
          <SnackBar
            position="bottom"
            OpenNoti={this.state.OpenNoti}
            CloseNoti={this.CloseNoti}
            message={this.state.Message}
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
