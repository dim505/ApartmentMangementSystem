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
import TenantModalSave from "./TenantModalSave";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
export default class TenantModal extends Component {
  state = { OpenTenantSaveNoti: false };

  OpenTenantSaveNoti = () => {
    debugger;
    this.setState({ OpenTenantSaveNoti: true });
  };

  CloseTenantSaveNoti = () => {
    this.setState({ OpenTenantSaveNoti: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenTenantSaveNoti}
          onClose={() => this.CloseTenantSaveNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Tenants Has Been Updated </span>}
        />

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
                        Tenants
                      </Typography>
                    </TableRow>
                    <TableRow>
                      <TableCell>name </TableCell>
                      <TableCell>phone </TableCell>
                      <TableCell>Lease Renew </TableCell>
                      <TableCell>
                        {" "}
                        <TenantModalSave
                          OpenTenantSaveNoti={this.OpenTenantSaveNoti}
                          CloseModal={this.props.CloseModal}
                        />{" "}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.TenantsFiltered.map(Tenant => (
                      <TableRow key={Tenant.GUID}>
                        <TableCell align="right">
                          <TextField
                            id="name"
                            label="Name"
                            type="text"
                            onChange={event =>
                              this.HandleChange({
                                Name: event.target.value
                              })
                            }
                            defaultValue={Tenant.name}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="phone"
                            label="phone"
                            type="text"
                            onChange={event =>
                              this.HandleChange({
                                phone: event.target.value
                              })
                            }
                            defaultValue={Tenant.phone}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="LeaseRenew"
                            label="Lease Renew"
                            type="date"
                            onChange={event =>
                              this.HandleChange({
                                LeaseRenew: event.target.value
                              })
                            }
                            defaultValue={Tenant.LeaseRenew}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </TableCell>

                        <TableCell align="right" />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
