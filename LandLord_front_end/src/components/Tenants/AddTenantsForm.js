import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import Axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

//contains text fields needed to added tenants
export default class AddTenantsForm extends Component {
  state = {
    Name: "",
    Email: "",
    Phone: "",
    LeaseDue: "",
    PropertyGuid: "",
    Properties: [],
  };

  componentDidMount() {
    //gets list of properties on component mount
    this.GetProperties();
  }

  ClearAddTenantsFormState = () => {
    this.setState({
      Name: "",
      Email: "",
      Phone: "",
      LeaseDue: "",
    });
  };

  //gets properties to prepopulate tenants house location drop-down
  GetProperties = async () => {
    //gets auth0 token
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes api call
    var results = Axios.get(
      "https://amsbackend.azurewebsites.netrewebsites.net/api/property",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        Properties: results.data,
        PropertyGuid: results.data[0].guid,
      })
    );
  };

  //function  used to check for empty fields
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }
  //updates state on which property was selected from dropdown / triggers parent component to update too
  handleChangeDropdown = (event) => {
    this.setState({ PropertyGuid: event.target.value }, () =>
      this.props.onChanged(this.state)
    );
  };
  //updates state on all other text forms / triggers parent component to update too
  handleChange = (NewState) => {
    this.setState(NewState, () => this.props.onChanged(this.state));
  };
  render() {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Select Tenant Location
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={this.state.PropertyGuid}
              onChange={this.handleChangeDropdown}
            >
              {this.state.Properties.map((property) => (
                <option key={property.guid} value={property.guid}>
                  {" "}
                  {property.street} {property.city}, {property.state}{" "}
                  {property.zipCode}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Name)
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={this.state.Name}
              onChange={(event) =>
                this.handleChange({ Name: event.target.value })
              }
              placeholder="Enter Name Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Email)
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={this.state.Email}
              onChange={(event) =>
                this.handleChange({ Email: event.target.value })
              }
              placeholder="Enter Email Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Phone Number
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Phone)
                  ? "ShowRed"
                  : " "
              }
              type="number"
              value={this.state.Phone}
              onChange={(event) =>
                this.handleChange({ Phone: event.target.value })
              }
              placeholder="Enter Phone Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Lease Date
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.LeaseDue)
                  ? "ShowRed"
                  : " "
              }
              type="date"
              value={this.state.LeaseDue}
              onChange={(event) =>
                this.handleChange({ LeaseDue: event.target.value })
              }
              placeholder="Enter Lease Due Date Here"
            />
          </Col>
        </Form.Group>
      </div>
    );
  }
}
