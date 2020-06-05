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
import ReceiptModalSave from "./ReceiptModalSave";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { Col, Form } from "react-bootstrap";
import { post } from "axios";
import Axios from "axios";

//component contains modal in case if someone wants to update a receipt
export default class ReceiptModal extends Component {
  state = {
    OpnModal: false,
    file: null,
    filepath: null,
  };

  //this sets the state for the filename to be display in the textbox
  setFile(e) {
    this.setState({ file: e.target.files[0], filepath: e.target.value });
  }

  //function function handles the calling of the Update API to update the receipt
  Update = async (e) => {
    e.preventDefault();
    var Mydata = {};
    var StoreVal;

    //checks value of the store text field
    if (document.getElementById("store").value === "") {
      StoreVal = document.getElementById("store").placeholder;
    } else {
      StoreVal = document.getElementById("store").value;
    }

    //builds out receipt object
    var receipt = {
      id: this.props.ReceiptFilterd[0].id,
      date: document.getElementById("date").value,
      tax: document.getElementById("tax").value,
      totalAmount: document.getElementById("totalAmount").value,
      store: StoreVal,
    };
    Mydata.receipt = receipt;
    const BearerToken = await this.props.auth.getTokenSilently();
    console.log(Mydata);

    //makes API call to update text portion of the reciept
    var AddRecResults = await Axios.post(
      "https://amsbackend.azurewebsites.net/api/receipt/UpdateReceipt",

      Mydata,

      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(
      (AddRecResults) => this.setState({ ReceiptUploadedNoti: true }),
      console.log(AddRecResults)
    );

    //check to see if new file has been uploaded
    if (this.state.file !== null) {
      //makes API call to update the imagehttps://amsbackend.azurewebsites.net
      const url = `https://amsbackend.azurewebsites.net/api/receipt/UpdateImage/${this.props.ReceiptFilterd[0].imageGuid}`;

      const formData = new FormData();
      formData.append("body", this.state.file);

      //makes api call to update image
      return post(url, formData, {
        headers: {
          Authorization: `bearer ${BearerToken}`,
        },
      }).then(() => this.props.OpenItemSavedSnkBar());
    } else {
      //invokes function to open the "item saved notification"
      this.props.OpenItemSavedSnkBar();
    }
  };

  render() {
    //amsbackend.azurewebsites.net
    https: return (
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
                      Edit Receipt
                    </Typography>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.ReceiptFilterd.map((Receipt) => (
                    <TableRow key={Receipt.id}>
                      <TableCell align="right">
                        <TextField
                          id="date"
                          label="Date"
                          type="date"
                          defaultValue={Receipt.date}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          label="Store"
                          id="store"
                          type="text"
                          defaultValue={Receipt.store}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          label="Tax"
                          type="number"
                          id="tax"
                          defaultValue={Receipt.tax}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          label="Total Amount"
                          type="number"
                          id="totalAmount"
                          defaultValue={Receipt.totalAmount}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <form onSubmit={(e) => this.Update(e)}>
                          <Col>
                            <Form.Control
                              disabled
                              type="text"
                              value={this.state.filepath}
                              placeholder="Image Path"
                            />
                          </Col>

                          <Col>
                            <Button
                              fullWidth={true}
                              component="label"
                              variant="contained"
                              color="default"
                              startIcon={<ImageIcon />}
                            >
                              Click To Update Image
                              <input
                                type="file"
                                accept="image/png, image/jpeg"
                                style={{ display: "none" }}
                                onChange={(e) => this.setFile(e)}
                              />
                            </Button>
                          </Col>
                        </form>
                      </TableCell>

                      <TableCell align="right">
                        <ReceiptModalSave
                          OpenItemSavedSnkBar={this.props.OpenItemSavedSnkBar}
                          Update={this.Update}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    );
  }
}
