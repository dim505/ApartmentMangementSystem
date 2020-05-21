import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function SnackBar(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={{ vertical: "bottom", horizontal: "center" }}
      open={props.OpenNoti}
      onClose={() => props.CloseNoti()}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{props.message}</span>}
    />
  );
}
