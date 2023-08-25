import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Logout } from "../components/Logout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export function AdminLayout(props) {
  const { children } = props;
  const theme = useTheme();

  const buttons = [
    { label: "Gestionar usuarios", href: "/admin/manage-users" },
    { label: "Gestionar depósitos", href: "/admin/manage-deposits" },
    { label: "Gestionar solicitudes", href: "/admin/manage-requests" },
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
            <Logout />
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Box>{children}</Box>
    </ThemeProvider>
  );
}
