import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";

//contains the textfields for the add receipt form
export default class AddReceiptForm extends Component {
  state = {
    Date: "",
    Store: "",
    Tax: "",
    TotalAmount: "",
  };

  ClearAddReceiptFormState = () => {
    this.setState({
      Date: "",
      Store: "",
      Tax: "",
      TotalAmount: "",
    });
  };

  // as a user types into the text fields, it updates the state with each letter and triggers the parent components to update state too
  handleChange(newState) {
    this.setState(newState, () => this.props.onChanged(this.state));
  }

  render() {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Date
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && isEmpty(this.state.Date)
                  ? "ShowRed"
                  : " "
              }
              type="date"
              value={this.state.Date}
              onChange={(event) =>
                this.handleChange({ Date: event.target.value })
              }
              placeholder="Enter Date Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Store
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && isEmpty(this.state.Store)
                  ? "ShowRed"
                  : " "
              }
              type="text"
              value={this.state.Store}
              onChange={(event) =>
                this.handleChange({ Store: event.target.value })
              }
              placeholder="Enter Store Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Tax
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && isEmpty(this.state.Tax)
                  ? "ShowRed"
                  : " "
              }
              type="number"
              min="1"
              value={this.state.Tax}
              onChange={(event) =>
                this.handleChange({ Tax: Math.abs(event.target.value) })
              }
              placeholder="Enter Tax Here"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Total Amount
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && isEmpty(this.state.TotalAmount)
                  ? "ShowRed"
                  : " "
              }
              type="number"
              min="1"
              value={this.state.TotalAmount}
              onChange={(event) =>
                this.handleChange({ TotalAmount: Math.abs(event.target.value) })
              }
              placeholder="Enter Total Amount Here"
            />
          </Col>
        </Form.Group>
      </div>
    );
  }
}
