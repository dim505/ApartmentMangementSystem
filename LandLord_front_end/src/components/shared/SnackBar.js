import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

//base component used to show notification alerts
export default function SnackBar(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: props.position, horizontal: "center" }}
      key={{ vertical: "bottom", horizontal: "center" }}
      open={props.OpenNoti}
      onClose={() => props.CloseNoti()}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{props.message}</span>}
    />
  );
}
