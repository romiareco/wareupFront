import React from "react";
import { Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function LinkSpacer() {
  const theme = useTheme();

  return <div style={{ marginTop: theme.spacing(1) }} />;
}
