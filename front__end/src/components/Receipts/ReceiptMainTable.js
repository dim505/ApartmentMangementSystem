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

export default class ReceiptMainTable extends Component {
  state = {};

  render() {
    return (
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
            {this.props.Receipts.map(Receipt => (
              <TableRow key={Receipt.id}>
                <TableCell align="right">{Receipt.Date}</TableCell>
                <TableCell align="right">{Receipt.Store}</TableCell>
                <TableCell align="right">${Receipt.Tax}</TableCell>
                <TableCell align="right">${Receipt.TotalAmount}</TableCell>
                <TableCell align="right">
                  <Tooltip
                    placement="top"
                    trigger="hover"
                    tooltip="Click to View Picture"
                  >
                    <ImageIcon />
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => this.props.OpenModal(Receipt.id)}
                    variant="outlined"
                    color="primary"
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <ReceiptRmvButton
                    OpenItmRmvNoti={this.props.OpenItmRmvNoti}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
