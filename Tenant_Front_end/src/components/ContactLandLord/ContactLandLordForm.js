import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//contains the textfields needed to send a message to the Land Lord
export const ContactLandLordForm = props => {
  const {
    values: { Subject, Message },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="Subject"
        name="Subject"
        label="Subject"
        value={Subject}
        fullWidth
        helperText={touched.Subject ? errors.Subject : ""}
        error={touched.Subject && Boolean(errors.Subject)}
        onChange={change.bind(null, "Subject")}
      />
      <TextField
        id="Message"
        name="Message"
        label="Message"
        fullWidth
        multiline
        value={Message}
        helperText={touched.Message ? errors.Message : ""}
        error={touched.Message && Boolean(errors.Message)}
        onChange={change.bind(null, "Message")}
      />

      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="primary"
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  );
};
