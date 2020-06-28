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
import MuiPhoneNumber from "material-ui-phone-number";

//component contains update modal
export default class TenantModal extends Component {
  state = { OpenTenantSaveNoti: false };

  //opens Tenant was Saved Notification
  OpenTenantSaveNoti = () => {
    this.setState({ OpenTenantSaveNoti: true });
  };
  //closes Tenant was Saved Notification
  CloseTenantSaveNoti = () => {
    this.setState({ OpenTenantSaveNoti: false });
  };

  render() {
    var MinDate = new Date().toISOString().split("T")[0];
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenTenantSaveNoti}
          onClose={() => this.CloseTenantSaveNoti()}
          ContentProps={{
            "aria-describedby": "message-id",
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
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell>
                        {" "}
                        <TenantModalSave
                          OpenTenantSaveNoti={this.OpenTenantSaveNoti}
                          CloseModal={this.props.CloseModal}
                          TenantsFiltered={this.props.TenantsFiltered}
                          CloseTenantList={this.props.CloseTenantList}
                          GetProperties={this.props.GetProperties}
                          GetTenants={this.props.GetTenants}
                          auth={this.props.auth}
                        />{" "}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.TenantsFiltered.map((Tenant) => (
                      <TableRow key={Tenant.guid}>
                        <TableCell align="right">
                          <TextField
                            id="name"
                            label="Name"
                            type="text"
                            defaultValue={Tenant.name}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="rentDue"
                            label="Tenant Rent"
                            type="number"
                            defaultValue={Tenant.rentDueEaMon}
                            onChange={(event) => {
                              document.getElementById(
                                "rentDue"
                              ).value = Math.abs(event.target.value);
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <MuiPhoneNumber
                            id="phone"
                            label="phone"
                            value={Tenant.phone}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            defaultCountry="usa"
                            regions={["north-america", "carribean"]}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            disabled
                            id="email"
                            label="email"
                            type="text"
                            defaultValue={Tenant.email}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TextField
                            id="leaseDue"
                            label="Lease Expire Date"
                            type="date"
                            defaultValue={Tenant.leaseDue}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{ min: MinDate }}
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
