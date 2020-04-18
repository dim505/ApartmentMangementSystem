import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Jump from "react-reveal/Jump";

//contains the suggested address for the user to use
export default class PropertySuggaddrUpdateModal extends Component {
  state = { checked: false, SelectedCheckboxID: "", SuggestedAddresses: [] };

  //fires every times a checkbox is clicked
  handleCheckBoxClick = locationId => {
    //if a already check off checkbox is clicked, it will uncheck its self
    if (
      locationId === this.state.SelectedCheckboxID &&
      this.state.checked === true
    ) {
      this.setState({ checked: false }, () =>
        this.props.SuggAddrChecked(this.state.checked)
      );
    } else {
      //checks off the appropriate check box in the list
      this.setState(
        {
          SelectedCheckboxID: locationId,
          checked: true
        },
        () => this.props.SuggAddrChecked(this.state.checked)
      );

      //triggers function to get check off address
      this.FilterAdddress(locationId);
    }
  };

  //filters and finds the  address for the selected checkbox
  FilterAdddress = locationId => {
    window.SuggestedAddress = window.SuggestedAddresses;
    window.SuggestedAddress = window.SuggestedAddress.filter(
      address => address.locationId === locationId
    );
    console.log(window.SuggestedAddress);
    this.props.UpdateSuggAddr(this.state.checked);
  };

  render() {
    var SuggestedAddr = [];
    //checks if api has been made yet
    if (this.props.SuggestedAddresses <= 0) {
      SuggestedAddr.push(
        <p>Please start typing a street address to get some suggestions</p>
      );
    }
    //checks if API call has been made and finds anything
    else if (this.props.SuggestedAddresses !== undefined) {
      window.SuggAddrMatchFilter = this.props.SuggestedAddresses;
      window.SuggestedAddresses = window.SuggAddrMatchFilter;

      //filters out filter to display only house level matches notifies user accordly
      if (
        this.props.SuggestedAddresses.filter(
          Address => Address.matchLevel === "houseNumber"
        ).length <= 0
      ) {
        SuggestedAddr.push(
          <p>No suggested Address. Try starting with a street address</p>
        );
      } else {
        //filters house level matches to max of 10 then builds out component to house address
        this.props.SuggestedAddresses.filter(
          Address => Address.matchLevel === "houseNumber"
        )
          .slice(0, 7)
          .map(Address =>
            SuggestedAddr.push(
              <Paper elevation={3}>
                <Checkbox
                  checked={
                    this.state.checked &&
                    this.state.SelectedCheckboxID === Address.locationId
                  }
                  onClick={() => this.handleCheckBoxClick(Address.locationId)}
                  onkey={Address.locationId}
                />
                {Address.address.houseNumber} {Address.address.street}{" "}
                {Address.address.city}, {Address.address.state}{" "}
                {Address.address.postalCode}
              </Paper>
            )
          );
      }
      //else tells user no suggested addresses found with what the user typed in
    } else {
      SuggestedAddr.push(<p>No suggested Address</p>);
    }
    return (
      <div>
        {" "}
        <h3>Suggested Addresses </h3>
        <Jump when={this.props.SuggestedAddresses !== undefined}>
          <React.Fragment>{SuggestedAddr}</React.Fragment>
        </Jump>
      </div>
    );
  }
}
