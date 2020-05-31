import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export const AddNewsForm = props => {
  const {
    values: { Subject, Message, HouseSelect, properties },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
    resetForm
  } = props;

  const change = (name, e) => {
    debugger;
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        classes={{ root: "HouseSelectStyle" }}
        error={touched.HouseSelect && Boolean(errors.HouseSelect)}
      >
        <InputLabel>Select House Address </InputLabel>
        <Select
          id="HouseSelect"
          name="HouseSelect"
          onChange={change.bind(null, "HouseSelect")}
          value={HouseSelect || ""}
        >
          {window.properties}
        </Select>
        <FormHelperText>
          {touched.HouseSelect ? errors.HouseSelect : ""}
        </FormHelperText>
      </FormControl>

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
        Submit
      </Button>
    </form>
  );
};
