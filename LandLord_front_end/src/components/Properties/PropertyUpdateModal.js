import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import TenantModalSave from "./TenantModalSave";
import Fade from "@material-ui/core/Fade";
import Axios from "axios";
import SnackBar from "../shared/SnackBar";
import PropertySuggaddrUpdateModal from "./PropertySuggaddrUpdateModal";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";

//contains modal used to update a single property
export default class PropertyUpdateModal extends Component {
  state = {
    OpnModal: false,
    OpenNoti: false,
    Message: "",
    SuggAddrChecked: false,
    SuggestedAddresses: "",
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
  };

  //tracks whether a checkbox is activly being checked
  SuggAddrChecked = (checked) => {
    this.setState({ SuggAddrChecked: checked });
  };

  //updates new state as a user types in new information in the form
  handleChange = async (newState) => {
    await this.setState(newState);
    if (!this.state.SuggAddrChecked) {
      this.GetSuggestedAddresses();
    }
  };

  //updates state from from parent before compoent loads
  async UNSAFE_componentWillReceiveProps(nextProps) {
    await this.setState({
      Street: nextProps.PropertiesFiltered[0].street,
      City: nextProps.PropertiesFiltered[0].city,
      State: nextProps.PropertiesFiltered[0].state,
      ZipCode: nextProps.PropertiesFiltered[0].zipCode,
    });
    this.GetSuggestedAddresses();
  }

  //updates suggested address if another suggested address checkbox is checked
  UpdateSuggAddr = async () => {
    if (window.SuggestedAddress[0].address.houseNumber === undefined) {
      window.SuggestedAddress[0].address.houseNumber = "";
    }
    var street = window.SuggestedAddress[0].address.houseNumber;
    street += " ";
    street += window.SuggestedAddress[0].address.street;
    await this.setState({
      Street: street,
      City: window.SuggestedAddress[0].address.city,
      State: window.SuggestedAddress[0].address.state,
      ZipCode: window.SuggestedAddress[0].address.postalCode,
    });
  };

  //function responsible for getting address suggestions
  GetSuggestedAddresses = async () => {
    //this builds out the address query
    var query = [];
    if (this.state.Street.length > 0) {
      query.push(this.state.Street);
    }
    if (this.state.City.length > 0) {
      query.push(" ");
      query.push(this.state.City);
    }
    if (this.state.State.length > 0) {
      query.push(" ");
      query.push(this.state.State);
    }

    if (this.state.ZipCode.length > 0) {
      query.push(" ");
      query.push(this.state.ZipCode);
    }

    query = query.join("");

    console.log(query);
    //makes the API call to gets the suggestions

    const BearerToken = await this.props.auth.getTokenSilently();

    var result = await Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/Property/GetSuggestedPropertiesAddress`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
        params: {
          query: query,
        },
      }
      //
      //
    ).then((result) => {
      this.setState({ SuggestedAddresses: result.data.suggestions });
    });
  };

  //function function handles the calling of the Update API to update the receipt
  Update = async (e) => {
    if (
      !isEmpty(document.getElementById("unit").value) &&
      !isEmpty(document.getElementById("yearlyInsurance").value) &&
      !isEmpty(document.getElementById("tax").value)
    ) {
      if (
        (this.props.PropertiesFiltered[0].street === this.state.Street &&
          this.props.PropertiesFiltered[0].city === this.state.City &&
          this.props.PropertiesFiltered[0].state === this.state.State &&
          this.props.PropertiesFiltered[0].zipCode === this.state.ZipCode) ||
        this.state.SuggAddrChecked
      ) {
        e.preventDefault();
        const BearerToken = await this.props.auth.getTokenSilently();
        var Mydata = {};

        var query =
          document.getElementById("street").value +
          " " +
          document.getElementById("city").value +
          " " +
          document.getElementById("state").value +
          " " +
          document.getElementById("zipcode").value;
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
        //builds out property object
        var property = {
          guid: this.props.PropertiesFiltered[0].guid,
          street: document.getElementById("street").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
          zipcode: document.getElementById("zipcode").value,
          unit: document.getElementById("unit").value,
          yearlyInsurance: document.getElementById("yearlyInsurance").value,
          tax: document.getElementById("tax").value,
          Lat: window.AddressPosition.lat,
          Lng: window.AddressPosition.lng,
        };
        Mydata.property = property;
        console.log(Mydata);

        //defines headers

        //makes API call to update text portion of the reciept
        var Results = await Axios.post(
          `${process.env.REACT_APP_BackEndUrl}/api/property/UpdateProperty`,
          Mydata,
          {
            headers: { Authorization: `bearer ${BearerToken}` },
          }
        ).then(
          (Results) => this.props.CloseModal(),
          this.setState({
            OpenNoti: true,
            Message: "Property Updated",
            SuggAddrChecked: false,
          }),
          console.log(Results),
          this.props.GetProperties()
        );
      } else {
        this.props.CloseModal();
        this.OpenNoti(
          "*** COULD NOT UPDATE!!! *** Please Check off a Suggested Property if you change the address"
        );
      }
    } else {
      this.props.CloseModal();
      this.OpenNoti(
        "*** COULD NOT UPDATE!!! *** Please leave no field empty before saving"
      );
    }
  };

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
        <SnackBar
          position="top"
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.OpnModal}
          onClose={this.props.CloseModal}
        >
          <Fade in={this.props.OpnModal} timeout={500}>
            <div className="PropUpdateModal">
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <Typography id="EditPropTitle" variant="h4">
                        Edit Property
                      </Typography>
                    </TableRow>
                    <TableRow />
                  </TableHead>
                  <TableBody>
                    {this.props.PropertiesFiltered.map((Property) => (
                      <TableRow key={Property.guid}>
                        <TableCell align="right">
                          <TextField
                            id="street"
                            label="Property Street"
                            type="text"
                            disabled={this.state.SuggAddrChecked}
                            defaultValue={Property.street}
                            value={this.state.Street}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) =>
                              this.handleChange({ Street: event.target.value })
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="city"
                            label="City"
                            type="text"
                            disabled={this.state.SuggAddrChecked}
                            value={this.state.City}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) =>
                              this.handleChange({ City: event.target.value })
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="state"
                            label="State"
                            type="text"
                            disabled={this.state.SuggAddrChecked}
                            value={this.state.State}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) =>
                              this.handleChange({ State: event.target.value })
                            }
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TextField
                            id="zipcode"
                            label="Zip Code"
                            type="text"
                            disabled={this.state.SuggAddrChecked}
                            value={this.state.ZipCode}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) =>
                              this.handleChange({ ZipCode: event.target.value })
                            }
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TextField
                            id="unit"
                            label="Number of Units"
                            type="number"
                            defaultValue={Property.unit}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) => {
                              document.getElementById("unit").value = Math.abs(
                                event.target.value
                              );
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="yearlyInsurance"
                            label="Yearly Insurance"
                            type="number"
                            defaultValue={Property.yearlyInsurance}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) => {
                              document.getElementById(
                                "yearlyInsurance"
                              ).value = Math.abs(event.target.value);
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TextField
                            id="tax"
                            label="Yearly tax"
                            type="number"
                            defaultValue={Property.tax}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) => {
                              document.getElementById("tax").value = Math.abs(
                                event.target.value
                              );
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TenantModalSave
                            OpenItemSavedSnkBar={this.props.OpenItemSavedSnkBar}
                            Update={this.Update}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <PropertySuggaddrUpdateModal
                SuggestedAddresses={this.state.SuggestedAddresses}
                UpdateSuggAddr={this.UpdateSuggAddr}
                SuggAddrChecked={this.SuggAddrChecked}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
