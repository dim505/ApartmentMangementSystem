import React, { Component } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { post } from 'axios';
import WebIcon from "@material-ui/icons/Web";
import { Form, Col, Row } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";

export default class UploadReceiptBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReceiptUploadedNoti: false,
      file: null,
      filepath: ""
    };
  }

   uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}


   submit = async (e) =>  {
    e.preventDefault();
    this.props.UploadSubmitCheck()
    
    
      if (!this.isEmpty(this.props.receipt.Date) && 
      !this.isEmpty(this.props.receipt.Store) &&
      !this.isEmpty(this.props.receipt.Tax) &&
      !this.isEmpty(this.props.receipt.TotalAmount) 
      && !this.isEmpty(this.state.filepath) ) {

        var ImageGuid = this.uuidv4()
        const AddImageUrl = `https://localhost:5001/api/receipt/${ImageGuid}`;
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
        
     
        Mydata.receipt =  this.props.receipt
        Mydata.receipt.ImageGuid = ImageGuid
        console.log(Mydata)
        const headers = {
          'Content-Type': 'application/json'
        }
    
         
        var AddRecResults = await Axios.post("https://localhost:5001/api/receipt/AddReceipt",Mydata,headers)
        .then((AddRecResults) =>
        this.setState({ReceiptUploadedNoti: true}),
        console.log(AddRecResults)
        
        )





      }


      
  }

  setFile(e) {
    this.setState({ file: e.target.files[0], filepath: e.target.value });
  }

  CloseReceiptUploadedNoti () {

    this.setState({ReceiptUploadedNoti: false})

  }
  render() {
    return (
      <div> 

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.ReceiptUploadedNoti}
          onClose={() => this.CloseReceiptUploadedNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Receipt Uploaded</span>}
        />
      
      <form onSubmit={e => this.submit(e)}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Image:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className={
                this.props.UploadBtnCkcOnce && this.isEmpty(this.state.filepath)
                  ? "ShowRed"
                  : " "
              }
              disabled
              type="text"
              value={this.state.filepath}
              placeholder="Please Upload An Image"
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
          onClick={this.submit}
          type="submit"
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >
          Submit Receipt
        </Button>
      </form>

      </div>
    );
  }
}
