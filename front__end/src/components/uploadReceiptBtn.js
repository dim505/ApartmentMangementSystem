import React, { Component } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { post } from 'axios';
import WebIcon from "@material-ui/icons/Web";
import { Form, Col, Row } from "react-bootstrap";

export default class UploadReceiptBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {

      file: null,
      filepath: null
    };
  }

   uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  


  async submit(e) {
    e.preventDefault();

    
    


    var ImageGuid = this.uuidv4()
    const AddImageUrl = `https://localhost:44343/api/receipt/${ImageGuid}`;
    const formData = new FormData();
    formData.append("body", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };


    var ImgResults = await post(AddImageUrl, formData, config);
    console.log(ImgResults)


    var Mydata = {};
    
 
    Mydata =  this.props.receipt
    Mydata.receipt.ImageGuid = ImageGuid
    console.log(Mydata)
    const headers = {
      'Content-Type': 'application/json'
    }

     
    var AddRecResults = await Axios.post("https://localhost:44343/api/receipt/AddReceipt",Mydata,headers)
    .then((AddRecResults) => console.log(AddRecResults))
    



  
  }

  setFile(e) {
    this.setState({ file: e.target.files[0], filepath: e.target.value });
  }

  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Image:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.flag && !Boolean(this.state.StreetAddress)
                  ? "ShowRed"
                  : " "
              }
              disabled
              type="text"
              value={this.state.filepath}
              placeholder="Image Location"
            />
          </Col>
        </Form.Group>
        <h4>File Upload</h4>
        <Button
          component="label"
          variant="contained"
          color="default"
          startIcon={<WebIcon />}
        >
          Browse
          <input
            type="file"
            style={{ display: "none" }}
            onChange={e => this.setFile(e)}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >
          Submit Receipt
        </Button>
      </form>
    );
  }
}
