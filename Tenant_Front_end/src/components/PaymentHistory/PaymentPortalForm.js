import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { CardElement } from "react-stripe-elements";
import Button from "@material-ui/core/Button";
import { injectStripe } from "react-stripe-elements";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import NumberFormat from "react-number-format";

import Tooltip from "@material-ui/core/Tooltip";

//this compoent contains the actual textfields needed to compete the rent payment 
class PaymentPortalForm extends Component {
  state = { Name: "", AmtDue: 0, Email: "" };

//reset values to default
  componentWillUnmount() {
    window.SubmitButtonClicked = false;
  }

//checks if field is empty 
  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }
   //updates state as user types 
  handleChange = async (NewState) => {
    await this.setState(NewState);
    Window.PaymentPortalFormState = this.state;
  };
  
   //handles the submitting of data
  handleSubmit = async (e) => {
    e.preventDefault();
	//checks that submit was clicked at least once 
    window.SubmitButtonClicked = true;
//get token representing the customer creditcard 
    let { token } = await this.props.stripe.createToken({
      name: this.state.Name,
    });
	//checks if all the fields have a value 
    if (
      !this.isEmpty(this.state.Name) &&
      !this.isEmpty(this.state.AmtDue) &&
      !this.isEmpty(this.state.Email) &&
      !this.isEmpty(token)
    ) {
		//opens warning dialog 
      Window.PaymentPortalFormState.token = token.id;
      this.props.OpenSaveWarnBox();
    } else {
		//opens warning notification 
      this.props.OpenNoti("Please fill out all forms in red");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="Name"
          name="Name"
          label="Name"
          value={this.state.Name || ""}
          helperText={
            this.isEmpty(this.state.Name) && window.SubmitButtonClicked
              ? "Enter Name"
              : ""
          }
          error={window.SubmitButtonClicked && this.isEmpty(this.state.Name)}
          onChange={(event) => {
            this.handleChange({ Name: event.target.value });
          }}
          fullWidth
        />

        <TextField
          id="Email"
          name="Email"
          label="Email"
          value={this.state.Email || ""}
          helperText={
            this.isEmpty(this.state.Email) && window.SubmitButtonClicked
              ? "Enter Email"
              : ""
          }
          error={window.SubmitButtonClicked && this.isEmpty(this.state.Email)}
          onChange={(event) => {
            this.handleChange({ Email: event.target.value });
          }}
          fullWidth
        />

        <TextField
          id="AmtDue"
          name="AmtDue"
          type="number"
          label="Amount Due"
          value={this.state.AmtDue}
          fullWidth
          helperText={
            this.isEmpty(this.state.AmtDue) && window.SubmitButtonClicked
              ? "Enter Amount"
              : ""
          }
          InputProps={{
            inputProps: { min: 1, max: this.props.PaymentInfoCard[0].rentDue },
          }}
          error={window.SubmitButtonClicked && this.isEmpty(this.state.AmtDue)}
          onChange={(event) => {
            this.handleChange({ AmtDue: event.target.value });
          }}
        />
        <Tooltip
          title={
            <span className={"StyleToolTip"}>
              "Enter 4242 4242 4242 4242 4242 424 to pay rent"
            </span>
          }
          placement="top"
        >
          <div>
            <CardElement />
          </div>
        </Tooltip>

        <Button
          classes={{ root: "PaymentSubmitBtn" }}
          type="submit"
          fullWidth
          variant="raised"
          color="primary"
        >
          Submit Payment{" "}
          <Fade
            in={this.props.LoadSpinner}
            style={{
              transitionDelay: this.props.LoadSpinner ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <div className="SpinnerStyle">
              <CircularProgress />
            </div>
          </Fade>
        </Button>
      </form>
    );
  }
}

export default injectStripe(PaymentPortalForm);
