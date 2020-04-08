import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

//contains the textfields for the add property form  
export default class AddPropertyForm extends Component {
  state = {
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
    Unit: "",
    YearlyInsurance: "",
    Tax: ""
  };

  //function to check for empty field 
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  // as a user types into the text fields, it updates the state with each letter and triggers the parent components to update state too
  handleChange = newState => {
    this.setState(newState, () => this.props.onChanged(this.state));
  };

   //function clears all values from the forms 
  ClearAddPropertyFormState() {
   
      this.setState({
        Street: "",
        City: "",
        State: "",
        ZipCode: "",
        Unit: "",
        YearlyInsurance: "",
        Tax: ""
      });
    
  }

  render() {
    
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Street
          </Form.Label>
          <Col sm="10">
            <Form.Control
              disabled={this.props.SuggAddrChecked}
              className={
                this.props.UploadBtnCkcOnce && !this.props.SuggAddrChecked
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={
                this.props.SuggAddrChecked
                  ? this.props.SuggestedAddr.Street
                  : this.state.Street
              }
              onChange={event =>
                this.handleChange({ Street: event.target.value })
              }
              placeholder="Enter Street Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            City
          </Form.Label>
          <Col sm="10">
            <Form.Control
              disabled={this.props.SuggAddrChecked}
              className={
                this.props.UploadBtnCkcOnce && !this.props.SuggAddrChecked
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={
                this.props.SuggAddrChecked
                  ? this.props.SuggestedAddr.City
                  : this.state.City
              }
              onChange={event =>
                this.handleChange({ City: event.target.value })
              }
              placeholder="Enter City Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            State
          </Form.Label>
          <Col sm="10">
            <Form.Control
              disabled={this.props.SuggAddrChecked}
              className={
                this.props.UploadBtnCkcOnce && !this.props.SuggAddrChecked
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={
                this.props.SuggAddrChecked
                  ? this.props.SuggestedAddr.State
                  : this.state.State
              }
              onChange={event =>
                this.handleChange({ State: event.target.value })
              }
              placeholder="Enter State Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Zip Code
          </Form.Label>
          <Col sm="10">
            <Form.Control
              disabled={this.props.SuggAddrChecked}
              className={
                this.props.UploadBtnCkcOnce && !this.props.SuggAddrChecked
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={
                this.props.SuggAddrChecked
                  ? this.props.SuggestedAddr.ZipCode
                  : this.state.ZipCode
              }
              onChange={event =>
                this.handleChange({ ZipCode: event.target.value })
              }
              placeholder="Enter Zipcode Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Units
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Unit)
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={this.state.Unit}
              onChange={event =>
                this.handleChange({ Unit: event.target.value })
              }
              placeholder="Enter Number of Units Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Yearly Insurance
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce &&
                this.isEmpty(this.state.YearlyInsurance)
                  ? "ShowRed"
                  : " "
              }
              type="number"
              value={this.state.YearlyInsurance}
              onChange={event =>
                this.handleChange({ YearlyInsurance: event.target.value })
              }
              placeholder="Enter Yearly Insurance Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Property Tax
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Tax)
                  ? "ShowRed"
                  : " "
              }
              type="number"
              value={this.state.Tax}
              onChange={event => this.handleChange({ Tax: event.target.value })}
              placeholder="Enter Property Tax Here"
            />
          </Col>
        </Form.Group>
      </div>
    );
  }

}


