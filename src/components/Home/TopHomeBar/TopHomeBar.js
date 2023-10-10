import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
import { LoginButton, SignUpButton } from "../../Button";
import { LogoAvatar } from "../../Avatars";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../assets/official-images/logoblanco.png";

export function TopHomeBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Link to="/">
              <Card sx={{ backgroundColor: "transparent" }}>
                <CardActionArea>
                  <CardMedia>
                    <LogoAvatar logo={logo} width={50} />
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Link>
            <Box
              sx={{
                display: "flex",
                marginLeft: "auto",
              }}
            >
              <LoginButton />
              <SignUpButton />
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </ThemeProvider>
  );
}
