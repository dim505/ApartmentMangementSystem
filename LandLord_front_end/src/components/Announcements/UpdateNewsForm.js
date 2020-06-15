import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


//form that contains the necessary textfields to update a news item 
export const UpdateNewsForm = props => {
  const {
    values: { Subject, Message, House },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
    resetForm
  } = props;
//handles the update in state for form and tracks if its touched 
  const change = (name, e) => {
    debugger;
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  debugger;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="House"
        name="House"
        label="House"
        disabled
        value={House || ""}
        fullWidth
        helperText={touched.House ? errors.House : ""}
        error={touched.House && Boolean(errors.House)}
        onChange={change.bind(null, "House")}
      />

      <TextField
        id="Subject"
        name="Subject"
        label="Subject"
        value={Subject || ""}
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
        value={Message || ""}
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
        Save
      </Button>
    </form>
  );
};
