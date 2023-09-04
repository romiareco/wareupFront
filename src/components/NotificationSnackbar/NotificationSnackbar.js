import React from "react";
import { Snackbar } from "@mui/material";
import Alert from "../Alerts/Alert";

export function NotificationSnackbar({ open, onClose, severity, message }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Centra vertical y horizontalmente
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
