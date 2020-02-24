import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bounce from "react-reveal/Bounce";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import UploadReceiptBtn from "./uploadReceiptBtn";
import AddReceiptForm from './AddReceiptForm'

export default class Receipt extends Component {
  state = {receipt: {}}

  handleChange = (NewState) => {
    this.setState({receipt: NewState})
  }

  render() {
    return (
      <div>
        <Link to="/Receipt">
          <Button
            variant="contained"
            color="default"
            startIcon={<BackspaceIcon />}
          >
            BACK
          </Button>
        </Link>
        <Bounce top>

          <AddReceiptForm 
                onChanged = {this.handleChange}/>
          <UploadReceiptBtn
              receipt = {this.state}       
          />
        </Bounce>
      </div>
    );
  }
}
