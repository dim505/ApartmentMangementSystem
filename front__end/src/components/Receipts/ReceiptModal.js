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
import Fade from 'react-reveal/Fade';

export default class ReceiptModal extends Component {
  state = { OpnModal: false, Receipts: {}, ReceiptFilterd: [] };

  render() {
    return (

      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.OpnModal}
        onClose={this.props.CloseModal}
      >
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
                {this.props.ReceiptFilterd.map(Receipt => (
                  <TableRow key={Receipt.id}>
                    <TableCell align="right">
                      <TextField
                        id="date"
                        label="Receipt Date"
                        type="date"
                        defaultValue={Receipt.Date}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <input type="text" value={Receipt.Store} />
                    </TableCell>
                    <TableCell align="right">
                      <NumericInput
                        id="NumInputstyle"
                        precision={2}
                        strict={true}
                        min={0}
                        max={999999}
                        value={Receipt.Tax}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericInput
                        id="NumInputstyle"
                        precision={2}
                        strict={true}
                        min={0}
                        max={999999}
                        value={Receipt.TotalAmount}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ImageIcon />
                    </TableCell>
                    <TableCell align="right">
                      <ReceiptModalSave
                        OpenItemSavedSnkBar={this.props.OpenItemSavedSnkBar}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
      
    );
  }
}
