import React, { Component } from "react";
import AddTenantsForm from "./AddTenantsForm";
import AddTenantsSubmitButton from "./AddTenantsSubmitButton";
import SnackBar from "../shared/SnackBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Bounce from "react-reveal/Bounce";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";
//main parent that houses the add tenants page
export default class AddTenants extends Component {
  constructor(props) {
    super(props);
    this.AddTenantsForm = React.createRef();
  }

  state = {
    OpenNoti: false,
    Message: "",
    UploadBtnCkcOnce: false,
    Tenants: [
      {
        Name: "",
        Email: "",
        Phone: "",
        LeaseDue: "",
        PropertyGuid: "",
        RentDue: "",
      },
    ],
  };
  //CONTAINS REFERENCE TO CLEAR CHILD COMPONENT STATE
  ClearAddTenantsFormState = () => {
    this.AddTenantsForm.current.ClearAddTenantsFormState();
  };
  //takes state from child component and update its accordly
  handleChange = (NewState) => {
    this.setState({ Tenants: NewState });
  };

  UploadSubmitCheck = async () => {
    //checks if forms are empty then reset state accordantly
    if (
      !isEmpty(this.state.Tenants.Name) &&
      !isEmpty(this.state.Tenants.Email) &&
      !isEmpty(this.state.Tenants.Phone) &&
      !isEmpty(this.state.Tenants.LeaseDue) &&
      !isEmpty(this.state.Tenants.RentDue)
    ) {
      await this.setState({
        UploadBtnCkcOnce: false,
        OpenNoti: false,
      });
    } else {
      await this.setState({
        UploadBtnCkcOnce: true,
      });

      this.OpenNoti("Please Fill Out the Forms in red");
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
        <Bounce top>
          <div className="SnackbarClass">
            <SnackBar
              position="bottom"
              OpenNoti={this.state.OpenNoti}
              CloseNoti={this.CloseNoti}
              message={this.state.Message}
            />
          </div>
          <div>
            <Link to="/Tenants">
              <Button
                variant="contained"
                color="default"
                startIcon={<BackspaceIcon />}
              >
                BACK
              </Button>
            </Link>
          </div>

          <AddTenantsForm
            UploadBtnCkcOnce={this.state.UploadBtnCkcOnce}
            onChanged={this.handleChange}
            auth={this.props.auth}
            ref={this.AddTenantsForm}
          />
          <AddTenantsSubmitButton
            Tenants={this.state.Tenants}
            UploadSubmitCheck={this.UploadSubmitCheck}
            auth={this.props.auth}
            ClearAddTenantsFormState={this.ClearAddTenantsFormState}
          />
        </Bounce>
      </div>
    );
  }
}
