import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bounce from "react-reveal/Bounce";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Link } from "react-router-dom";
import UploadReceiptBtn from "./uploadReceiptBtn";
import AddReceiptForm from "./AddReceiptForm";
import SnackBar from "../shared/SnackBar";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";

//parent component contains forms and submit button for add receipt page
export default class Receipt extends Component {
  constructor(props) {
    super(props);
    this.AddReceiptForm = React.createRef();
  }

  state = {
    receipt: { Date: "", Store: "", Tax: "", TotalAmount: "" },
    UploadBtnCkcOnce: false,
    OpenNoti: false,
    Message: "",
  };

  //contains reference to child component function ClearAddReceiptFormState so it can be triggered to clear state when of form when submit button is clicked
  ClearAddReceiptFormState = () => {
    this.AddReceiptForm.current.ClearAddReceiptFormState();
  };
  //takes state from child component and update its accordingly
  handleChange = (NewState) => {
    this.setState({ receipt: NewState });
  };

  UploadSubmitCheck = async () => {
    //checks if forms are empty then reset state accordingly
    if (
      !isEmpty(this.state.receipt.Date) &&
      !isEmpty(this.state.receipt.Store) &&
      !isEmpty(this.state.receipt.Tax) &&
      !isEmpty(this.state.receipt.TotalAmount)
    ) {
      //
      await this.setState({
        UploadBtnCkcOnce: false,
        OpenNoti: false,
      });
    } else {
      //opens the appropriate notifications
      await this.setState({
        UploadBtnCkcOnce: true,
      });
      this.OpenNoti("Please Fill Out The Forms In Red");
    }
  };

  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    return (
      <div>
        <div className="SnackbarClass">
          <SnackBar
            position="bottom"
            OpenNoti={this.state.OpenNoti}
            CloseNoti={this.CloseNoti}
            message={this.state.Message}
          />
        </div>

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
            onChanged={this.handleChange}
            UploadBtnCkcOnce={this.state.UploadBtnCkcOnce}
            ref={this.AddReceiptForm}
          />
          <UploadReceiptBtn
            receipt={this.state.receipt}
            UploadSubmitCheck={this.UploadSubmitCheck}
            UploadBtnCkcOnce={this.state.UploadBtnCkcOnce}
            FillFormsNoti={this.state.FillFormsNoti}
            auth={this.props.auth}
            ClearAddReceiptFormState={this.ClearAddReceiptFormState}
          />
        </Bounce>
      </div>
    );
  }
}
