import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import Axios from 'axios';

export default class AddTenantsForm extends Component {
  state = { Name: "", Email: "", Phone: "", LeaseDue: "", PropertyGuid: "",Properties: []};

  componentDidMount () {
    this.GetProperties() 

  }
  GetProperties = () => {
      var results =   Axios({
        url: "https://amsbackend.azurewebsites.net/api/property"
       }).then( (results) => 
         this.setState({
        Properties: results.data,
        PropertyGuid: results.data[0].guid
       }),
        
       );

  }


  
  
  
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  handleChangeDropdown = (event) => {
    this.setState({PropertyGuid: event.target.value}, () => this.props.onChanged(this.state) );
  }
  handleChange = NewState => {
    debugger;
    this.setState(NewState, () => this.props.onChanged(this.state));
  };
  render() {
    return (
      <div>
      
      <Form.Group as={Row}>
    <Form.Label column sm="2">Select Tenant Location</Form.Label>
    <Col sm="10">
    <Form.Control as="select" value={this.state.PropertyGuid} onChange={this.handleChangeDropdown} >
    
      {this.state.Properties.map(property => 
     <option key={property.guid} value={property.guid}> {property.street} {property.city}, {property.state} </option>
      )
      
      }
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
              onChange={event =>
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
              onChange={event =>
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
              onChange={event =>
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
              onChange={event =>
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
