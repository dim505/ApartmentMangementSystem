import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { CardElement } from "react-stripe-elements";
import Button from "@material-ui/core/Button";
import { injectStripe } from "react-stripe-elements";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
/* 




          value={Name || ""}
          helperText={touched.Name ? errors.Name : ""}
          error={touched.Name && Boolean(errors.Name)}
          onChange={change.bind(null, "Name")}
		  
		  

          value={AmtDue || ""}
          helperText={touched.AmtDue ? errors.AmtDue : ""}
          error={touched.AmtDue && Boolean(errors.AmtDue)}
          onChange={change.bind(null, "AmtDue")}
		  
		  
*/
class PaymentPortalForm extends Component {
  state = { Name: "", AmtDue: "", Email: "", loading: false };

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
          label="Amount Due"
          value={this.state.AmtDue || ""}
          helperText={
            this.isEmpty(this.state.Name) && window.SubmitButtonClicked
              ? "Enter Amount"
              : ""
          }
          error={window.SubmitButtonClicked && this.isEmpty(this.state.AmtDue)}
          fullWidth
          multiline
          onChange={(event) => {
            this.handleChange({ AmtDue: event.target.value });
          }}
        />

        <CardElement />
        <Button type="submit" fullWidth variant="raised" color="primary">
          Submit Payment{" "}
          <Fade
            in={this.state.loading}
            style={{
              transitionDelay: this.state.loading ? "800ms" : "0ms",
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
