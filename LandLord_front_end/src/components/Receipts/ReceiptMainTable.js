import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import Tooltip from "../Tooltip";
import ReceiptRmvButton from "./ReceiptRmvButton";
import Button from "@material-ui/core/Button";
import ReceiptImageModal from "./ReceiptImageModal";


//contains all the receipts that have been uploaded 
export default class ReceiptMainTable extends Component {
  state = { OpenImageModal: false,ReceiptFilterdImg: [{imageUrl: "ee"}],ProgessCircle : false };

	//converts string from data bases to an array buffer 
  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

	//this function creates a URl to view the image 
  CreateImageUrl(ImageStr, ImageType) {
    
    const data = ImageStr;
    const arrayBuffer = this.base64ToArrayBuffer(data);
    const blob = new Blob([arrayBuffer], { type: ImageType });
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  }


	//this modal filters the receipts and generates the URL link for the image associated with the selected receipt 
  OpenImageModal(id) {
     ;
    let ReceiptFilterdImg = this.props.Receipts;
    ReceiptFilterdImg = ReceiptFilterdImg.filter(Receipt => Receipt.id === id);
    var objectURL = this.CreateImageUrl(ReceiptFilterdImg[0].image,ReceiptFilterdImg[0].contentType )
    ReceiptFilterdImg.imageUrl = objectURL
    
    this.setState({ OpenImageModal: true, ReceiptFilterdImg: ReceiptFilterdImg });

  }

	//this function closes the image modal 
  CloseImageModal = () => {
    this.setState({
      OpenImageModal: false
    });
  };

  render() {
    return (
      <div>
      <ReceiptImageModal
        OpenImageModal={this.state.OpenImageModal}
        CloseImageModal={this.CloseImageModal}
        objectURL={this.state.ReceiptFilterdImg.imageUrl}
      />
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <Typography variant="h4">All Receipts</Typography>
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
            {this.props.Receipts.map((Receipt) => (
              <TableRow key={Receipt.id}>
                 
                <TableCell >{Receipt.date}</TableCell>
                <TableCell >{Receipt.store}</TableCell>
                <TableCell >${Receipt.tax}</TableCell>
                <TableCell >${Receipt.totalAmount}</TableCell>
                <TableCell >
                <Tooltip
                      placement="top"
                      trigger="hover"
                      tooltip="Click to View Picture"
                    >
                      <Button
                        onClick={() => this.OpenImageModal(Receipt.id)}
                        variant="outlined"
                      >
                        <ImageIcon />
                      </Button>
                    </Tooltip>

                  


                </TableCell>
                <TableCell>
                <Button
                    onClick={() => this.props.OpnReceiptViewModal(Receipt.id)}
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => this.props.OpenModal(Receipt.id)}
                    variant="outlined"
                    color="primary"
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell >
                        <ReceiptRmvButton
                          OpenItmRmvNoti={this.props.OpenItmRmvNoti}
                          id = {Receipt.id}
                          getReceipts = {this.props.getReceipts}
                          auth = {this.props.auth}

                        />

                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }
}
