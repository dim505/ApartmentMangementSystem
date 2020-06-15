import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { CardElement } from "react-stripe-elements";
import Button from "@material-ui/core/Button";
import { injectStripe } from "react-stripe-elements";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import NumberFormat from "react-number-format";

import Tooltip from "@material-ui/core/Tooltip";

class PaymentPortalForm extends Component {
  state = { Name: "", AmtDue: 0, Email: "" };

  componentWillUnmount() {
    window.SubmitButtonClicked = false;
  }

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }
  handleChange = async (NewState) => {
    await this.setState(NewState);
    Window.PaymentPortalFormState = this.state;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    window.SubmitButtonClicked = true;

    let { token } = await this.props.stripe.createToken({
      name: this.state.Name,
    });

    if (
      !this.isEmpty(this.state.Name) &&
      !this.isEmpty(this.state.AmtDue) &&
      !this.isEmpty(this.state.Email) &&
      !this.isEmpty(token)
    ) {
      Window.PaymentPortalFormState.token = token.id;
      this.props.OpenSaveWarnBox();
    } else {
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

        <CardElement />

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
