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
import ImageIcon from "@material-ui/icons/Image";
import NumericInput from "react-numeric-input";
import ReceiptModalSave from "./ReceiptModalSave";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { Col, Form} from "react-bootstrap";
import { post } from 'axios';
import Axios from "axios";


export default class ReceiptModal extends Component {
  state = { 
     OpnModal: false, 
     file: null,
     filepath: null,
     
     
    };



     setFile(e) {
      debugger;
      this.setState({ file: e.target.files[0], filepath: e.target.value });
    }

    HandleChangeReceiptModal = newState => {
      debugger;
      var ReceiptFilterd =  this.props.ReceiptFilterd[0]
      var Key = Object.keys(newState)
      var Property = Key[0]
      var value = newState.Property

      ReceiptFilterd.Property = value
      console.log(ReceiptFilterd)
     // this.setState(newState, this.props.HandleChangeReceiptModal(this.state));
    };

    
  
     Update = async (e) => {
      e.preventDefault();
      var Mydata = {}; 
      var StoreVal 
      if (document.getElementById("store").value === "") {

         StoreVal = document.getElementById("store").placeholder

      } else {
        StoreVal = document.getElementById("store").value


      }
      
      var receipt = {
        id : this.props.ReceiptFilterd[0].id, 
        date : document.getElementById("date").value,
        tax : document.getElementById("tax").value,
        totalAmount : document.getElementById("totalAmount").value, 
        store : StoreVal

      }
      Mydata.receipt = receipt
      console.log(Mydata)
      const headers = {
        'Content-Type': 'application/json'
      }
  
       
      var AddRecResults = await Axios.post("https://amsbackend.azurewebsites.net/api/receipt/UpdateReceipt",Mydata,headers)
      .then((AddRecResults) =>
      this.setState({ReceiptUploadedNoti: true}),
      console.log(AddRecResults)
      )

      
  if (this.state.file !== null) {
    const url = `https://amsbackend.azurewebsites.net/api/receipt/UpdateImage/${this.props.ReceiptFilterd[0].imageGuid}`;
    const formData = new FormData();
    formData.append("body", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config)
    .then( () => 
          this.props.OpenItemSavedSnkBar()
    )
 
  } else {
        this.props.OpenItemSavedSnkBar()
  }


          








    }
  

  render() {
    return (

      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.OpnModal}
        onClose={this.props.CloseModal}
      >

<Fade in={this.props.OpnModal} timeout={500}>
        <div className="ModalStyle">
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <Typography id="OrdSummTitle" variant="h4">
                    All Receipts
                  </Typography>
                </TableRow>
                <TableRow>
                  <TableCell>Date </TableCell>
                  <TableCell>Store </TableCell>
                  <TableCell>Tax </TableCell>
                  <TableCell>Total Amount </TableCell>
                  <TableCell>Image </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.ReceiptFilterd.map((Receipt => (
                  <TableRow key={Receipt.id}>
                    <TableCell align="right">
                      <TextField
                        id="date"
                        label="Receipt Date"
                        type="date"
                        defaultValue={Receipt.date}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>
                    <TableCell align="right">
                      <input id="store" type="text" placeholder={Receipt.store} />
                    </TableCell>
                    <TableCell align="right">
                      <NumericInput
                        className="NumInputstyle"
                        id="tax"
                        precision={2}
                        strict={true}
                        min={0}
                        max={999999}
                        value={Receipt.tax}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericInput
                        className="NumInputstyle"
                        id="totalAmount"
                        precision={2}
                        strict={true}
                        min={0}
                        max={999999}
                        value={Receipt.totalAmount}
                      />
                    </TableCell>
                    <TableCell align="right">
                    <form onSubmit={e => this.Update(e)}>

                            <Col>
                            <Button
                              component="label"
                              variant="contained"
                              color="default"
                              startIcon={<ImageIcon />}
                            >
                              Click To Update Image
                              <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={e => this.setFile(e)}
                              />
                            </Button>
                            </Col>
                            <Col>
                                <Form.Control
                                disabled
                                type="text"
                                value={this.state.filepath}
                                placeholder="Image Path"
                                />
                              </Col>
                          
                        </form>
                    </TableCell>
                    
                    <TableCell align="right">
                      <ReceiptModalSave
                        OpenItemSavedSnkBar={this.props.OpenItemSavedSnkBar}
                        Update = {this.Update}
                      />
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        </Fade>
      </Modal>
      
    );
  }
}
