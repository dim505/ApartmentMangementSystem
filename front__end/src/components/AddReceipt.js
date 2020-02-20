import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import WebIcon from "@material-ui/icons/Web";
import Bounce from "react-reveal/Bounce";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";

export default class Receipt extends Component {
  render() {
    return (
      <div>
        <Link to="/Receipt">
          <Button
            variant="contained"
            color="default"
            startIcon={<BackspaceIcon />}
          >
            BACK
          </Button>
        </Link>
        <Bounce top>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className={
                  this.props.flag && !Boolean(this.state.StreetAddress)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value="BiteME"
                onChange={event =>
                  this.handleChange({ StreetAddress: event.target.value })
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
                  this.props.flag && !Boolean(this.state.StreetAddress)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value="BiteME"
                onChange={event =>
                  this.handleChange({ StreetAddress: event.target.value })
                }
                placeholder="Enter Date Here"
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
                  this.props.flag && !Boolean(this.state.StreetAddress)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value="BiteME"
                onChange={event =>
                  this.handleChange({ StreetAddress: event.target.value })
                }
                placeholder="Enter Date Here"
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
                  this.props.flag && !Boolean(this.state.StreetAddress)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value="BiteME"
                onChange={event =>
                  this.handleChange({ StreetAddress: event.target.value })
                }
                placeholder="Enter Date Here"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className={
                  this.props.flag && !Boolean(this.state.StreetAddress)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value="BiteME"
                onChange={event =>
                  this.handleChange({ StreetAddress: event.target.value })
                }
                placeholder="Enter Date Here"
              />
            </Col>
          </Form.Group>

          <Button variant="contained" color="default" startIcon={<WebIcon />}>
            Browse
          </Button>

          <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </Bounce>
      </div>
    );
  }
}
