import React from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

export default Alert;
