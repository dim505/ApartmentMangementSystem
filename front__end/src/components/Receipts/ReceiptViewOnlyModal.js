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
import Tooltip from "../Tooltip";



export default class ReceiptViewOnlyModal extends Component {
  state = { 
     OpnModal: false, 
     file: null,
     filepath: null,
     
     
    };





    
   
  

  render() {
    return (

      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.OpnReceiptViewModal}
        onClose={this.props.CloseReceiptViewModal}
      >

<Fade in={this.props.OpnReceiptViewModal} timeout={500}>
        <div className="ModalStyle">
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <Typography id="OrdSummTitle" variant="h4">
                    View Receipt
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
                        value={Receipt.date}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>
                    <TableCell align="right">
                      <input id="store"  type="text" value={Receipt.store} />
                    </TableCell>
                    <TableCell align="right">

                    <input id="tax"  type="text"  value={Receipt.tax} />

                    </TableCell>
                    <TableCell align="right">

                    <input id="tax"  type="text"  value={Receipt.totalAmount} />
                    </TableCell>
                    <TableCell align="right">
                    

                    <Tooltip
                      placement="top"
                      trigger="hover"
                      tooltip="Please click image on Main table to view image"
                    >
                            <Button
                              component="label"
                              variant="contained"
                              color="default"
                              startIcon={<ImageIcon />}
                            >

                            </Button>
                            </Tooltip>

                        
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

 
