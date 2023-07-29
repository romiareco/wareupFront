import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import {Logout} from "../components/Logout";

export function AdminLayout(props) {
  const { children } = props;
  const theme = useTheme();

  const buttons = [
    { label: "Gestionar usuarios", href: "/admin/manage-users" },
    { label: "Gestionar depósitos", href: "/admin/manage-deposits" },
    { label: "Gestionar solicitudes", href: "/admin/manage-requests" },
  ];

  return (
    <div className="admin-layout">
      <div className="admin-layout__right">
        <div className="u-header">
          <AppBar position="static">
            <Box width="100%">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/admin/home"
                  sx={{
                    mr: 2,
                    ml: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  WARE UP
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      href={button.href}
                      sx={{
                        my: 2,
                        color:
                          theme.components.MuiButton.styleOverrides
                            .containedPrimary,
                        display: "block",
                        ml: index > 0 ? 1 : 0, // Aplicar margen izquierdo solo a partir del segundo botón
                      }}
                    >
                      {button.label}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Logout />
                </Box>
              </Toolbar>
            </Box>
          </AppBar>
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
