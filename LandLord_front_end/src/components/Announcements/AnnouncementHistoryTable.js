import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class AnnouncementHistoryTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Property </TableCell>
              <TableCell>New Headline </TableCell>
              <TableCell>News Body </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.PropNews.map(dataline => (
              <TableRow key={dataline.Property}>
                <TableCell>{dataline.Property}</TableCell>
                <TableCell>{dataline.NewsHeader} ....</TableCell>
                <TableCell>
                  <Typography>${dataline.NewsBodyShort} ....</Typography>
                </TableCell>

                <TableCell align="right">
                  <Button
                    onClick={() => this.props.OpnModalVeiw(dataline.Property)}
                    variant="outlined"
                  >
                    View
                  </Button>

                  <Button
                    onClick={() => this.props.OpnModal(dataline.Property)}
                    variant="outlined"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => this.props.HandleClick(dataline.Property)}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
