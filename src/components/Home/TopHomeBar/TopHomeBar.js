import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
import { LoginButton, SignUpButton } from "../../Button";

export function TopHomeBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                marginLeft: "auto",
              }}
            >
              <LoginButton />
              <SignUpButton textName={"Registrarse"} />
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </ThemeProvider>
  );
}
