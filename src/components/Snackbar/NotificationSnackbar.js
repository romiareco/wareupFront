import React from "react";
import { Snackbar } from "@mui/material";
import Alert from "../Alert/Alert";

export function NotificationSnackbar({ open, onClose, severity, message }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
