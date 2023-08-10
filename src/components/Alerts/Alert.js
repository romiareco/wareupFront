import React from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    />
  );
});

export default Alert;
