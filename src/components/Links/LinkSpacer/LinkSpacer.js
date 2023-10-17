import React from "react";
import { useTheme } from "@mui/material/styles";

export function LinkSpacer() {
  const theme = useTheme();

  return <div style={{ marginTop: theme.spacing(1) }} />;
}
