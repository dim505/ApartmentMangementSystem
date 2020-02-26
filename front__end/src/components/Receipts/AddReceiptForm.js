import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";


export default class ReceiptForm extends Component {
    state = {
        Date: "",
        Store: "",
        Tax: "",
        TotalAmount: ""
  }



  isEmpty(str) {
    return (!str || /^\s*$/.test(str));
  }


  	// as a user types into the text fields, it updates the state with each letter and triggers the parent components to update state too
      handleChange (newState) {
        this.setState(newState, () => this.props.onChanged(this.state));
    }

    render () {
        return (
        <div>
            <Form.Group as={Row}>
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className={
                  this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Date)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value={this.state.Date}
                onChange={event =>
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
                  this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Store)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value={this.state.Store}
                onChange={event =>
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
                  this.props.UploadBtnCkcOnce && this.isEmpty(this.state.Tax)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value={this.state.tax}
                onChange={event =>
                  this.handleChange({ Tax: event.target.value })
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
                  this.props.UploadBtnCkcOnce && this.isEmpty(this.state.TotalAmount)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value={this.state.TotalAmount}
                onChange={event =>
                  this.handleChange({ TotalAmount: event.target.value })
                }
                placeholder="Enter Total Amount Here"
              />
            </Col>
          </Form.Group>
          </div>



        )
    }

}


