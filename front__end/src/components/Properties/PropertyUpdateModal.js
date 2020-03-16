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
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";


export default class PropertyUpdateModal extends Component {
  state = { 
     OpnModal: false,
     OpenPropertySavedNoti: false 
    };

   
	//function function handles the calling of the Update API to update the receipt 
     Update = async (e) => {
      e.preventDefault();
      var Mydata = {}; 
      
	  //builds out receipt object 
      var property = {
        guid : this.props.PropertiesFiltered[0].guid, 
        street : document.getElementById("street").value,
        city : document.getElementById("city").value,
        state : document.getElementById("state").value, 
        unit : document.getElementById("unit").value, 
        yearlyInsurance : document.getElementById("yearlyInsurance").value, 
        tax : document.getElementById("tax").value, 
      }
      Mydata.property = property
      console.log(Mydata)
      const headers = {
        'Content-Type': 'application/json'
      }
  
       //makes API call to update text portion of the reciept 
      var Results = await Axios.post("https://localhost:5001/api/property/UpdateProperty",Mydata,headers)
      .then((Results) =>
      this.props.CloseModal(),
      this.setState({OpenPropertySavedNoti: true}),
      console.log(Results),
      this.props.GetProperties()
      )


    }

    OpenPropertySavedNoti= () => {
      this.setState({OpenPropertySavedNoti: true})
    }

    ClosePropertySavedNoti = () => {
      this.setState({OpenPropertySavedNoti: false})
      }

  render() {
    return (
    <div>
      <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={{ vertical: "bottom", horizontal: "center" }}
      open={this.state.OpenPropertySavedNoti}
      onClose={() => this.ClosePropertySavedNoti()}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">Property Updated</span>}
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
                  <Typography id="EditPropTitle" variant="h4">
                    Edit Property
                  </Typography>
                </TableRow>
                <TableRow>
 
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.PropertiesFiltered.map((Property => (
                  <TableRow key={Property.guid}>
                    <TableCell align="right">
                      <TextField
                        id="street"
                        label="Property Street"
                        type="text"
                        defaultValue={Property.street}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>
                    <TableCell align="right">
                    <TextField
                        id="city"
                        label="City"
                        type="text"
                        defaultValue={Property.city}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>
                    <TableCell align="right">
                    <TextField
                        id="state"
                        label="State"
                        type="text"
                        defaultValue={Property.state}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>
                    <TableCell align="right">
                    <TextField
                        id="unit"
                        label="Units"
                        type="text"
                        defaultValue={Property.unit}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>
                    <TableCell align="right">
                    <TextField
                        id="yearlyInsurance"
                        label="Yearly Insurance"
                        type="text"
                        defaultValue={Property.yearlyInsurance}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>

                    <TableCell align="right">
                    <TextField
                        id="tax"
                        label="Yearly tax"
                        type="text"
                        defaultValue={Property.tax}
                        InputLabelProps={{
                          shrink: true
                        }}

                      />
                    </TableCell>


                    
                    <TableCell align="right">
                      <TenantModalSave
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
      </div>
      
    );
  }
}
