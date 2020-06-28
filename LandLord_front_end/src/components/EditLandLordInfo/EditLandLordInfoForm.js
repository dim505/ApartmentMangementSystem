import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import WebIcon from "@material-ui/icons/Web";
import MuiPhoneNumber from "material-ui-phone-number";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

//form that contains the necessary textfields to edit the landlord account information
export const EditLandLordInfoForm = (props) => {
  const {
    values: { Name, Email, PhoneNumber, file },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    setFieldValue,
  } = props;

  //handles the update in state for form and tracks if its touched
  const change = (name, e) => {
    //e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="Name"
        name="Name"
        label="Name"
        value={Name}
        fullWidth
        onChange={change.bind(null, "Name")}
        helperText={touched.Name ? errors.Name : ""}
        error={touched.Name && Boolean(errors.Name)}
      />

      <TextField
        id="Email"
        value={Email}
        name="Email"
        label="Email"
        fullWidth
        onChange={change.bind(null, "Email")}
        helperText={touched.Email ? errors.Email : ""}
        error={touched.Email && Boolean(errors.Email)}
      />

      <MuiPhoneNumber
        id="PhoneNumber"
        name="PhoneNumber"
        label="Phone Number"
        fullWidth
        value={PhoneNumber}
        InputLabelProps={{
          shrink: true,
        }}
        defaultCountry="us"
        onChange={(e) => {
          setFieldValue("PhoneNumber", e.replace("+", ""));
          setFieldTouched("PhoneNumber", true, false);
        }}
        helperText={touched.PhoneNumber ? errors.PhoneNumber : ""}
        error={touched.PhoneNumber && Boolean(errors.PhoneNumber)}
      />

      <TextField
        disabled
        id="file"
        name="file"
        label="Profile Image"
        fullWidth
        value={file}
      />

      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Button
            variant="raised"
            color="primary"
            component="label"
            fullWidth
            startIcon={<WebIcon />}
          >
            Browse
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={(event) => {
                debugger;
                //checks if the uploaded file is valid
                if (
                  event.currentTarget.files.length > 0 &&
                  event.currentTarget.files[0].size < 500000 &&
                  event.currentTarget.files[0] !== "undefined"
                ) {
                  setFieldValue("file", event.currentTarget.files[0].name);
                  window.TenantPicture = event.target.files[0];

                  //lets user know file is too big
                } else if (
                  event.currentTarget.files.length > 0 &&
                  event.currentTarget.files[0] !== "undefined"
                ) {
                  console.log(props);
                  props.SetMessage(
                    "Please Upload a thumbnail file under 512 kb"
                  );
                  props.OpenNoti();
                  setFieldValue("file", "");
                }
              }}
            />
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            disabled={!isValid}
            startIcon={<CloudUploadIcon />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
