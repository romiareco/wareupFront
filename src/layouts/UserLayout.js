import React from "react";
import { Logout } from "../components/Logout";
import { UserProfileButton } from "../components/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  IconButton,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export function UserLayout(props) {
  const { children } = props;
  const theme = useTheme();

  const buttons = [
    { label: "Tengo espacio", href: "/users/request-deposit" },
    { label: "Gestionar mis espacios", href: "/users/my-deposits" },
    { label: "Gestionar mis empresas", href: "/users/my-companies" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton href="/users/home" color={"inherit"}>
              <HomeRoundedIcon />
            </IconButton>

            {buttons.map((button, index) => (
              <Button
                key={index}
                href={button.href}
                sx={{
                  my: 2,
                  color:
                    theme.components.MuiButton.styleOverrides.containedPrimary,
                  display: "block",
                  ml: index > 0 ? 1 : 0, // Aplicar margen izquierdo solo a partir del segundo botón
                }}
              >
                {button.label}
              </Button>
            ))}
                    <Box sx={{ flexGrow: 1 }} />

            <UserProfileButton />
            <Logout />
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Box>{children}</Box>
    </ThemeProvider>
  );
}
