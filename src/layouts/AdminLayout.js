import React, { useState } from "react";
import { Logout } from "../components/Logout";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Button, Box, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";

export function AdminLayout(props) {
  const { children } = props;
  const theme = useTheme();

  // Crear un estado de anclaje para cada botón con menú desplegable
  const [anchorEl, setAnchorEl] = useState({});

  const buttons = [
    { label: "Gestionar usuarios", href: "/admin/manage-users" },
    {
      label: "Gestionar depósitos",
      menuItems: [
        { label: "Publicar depósito", href: "/admin/register-deposit" },
        { label: "Listado de depósitos", href: "/admin/manage-deposits" },
      ],
    },
    {
      label: "Gestionar solicitudes",
      menuItems: [
        {
          label: "Solicitudes de registro de depósito",
          href: "/admin/manage-deposits-requests",
        },
        {
          label: "Solicitudes de arrendamiento",
          href: "/admin/manage-booking-requests",
        },
      ],
    },
  ];

  const handleClick = (event, index) => {
    // Establecer el estado de anclaje específico para este botón
    setAnchorEl({ ...anchorEl, [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    // Cerrar el menú desplegable específico para este botón
    setAnchorEl({ ...anchorEl, [index]: null });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton href="/admin/home" color={"inherit"}>
              <HomeRoundedIcon />
            </IconButton>

            {buttons.map((button, index) => (
              <Box key={index}>
                {button.menuItems ? (
                  <Button
                    id={`menu-button-${index}`}
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, index)} // Pasar el índice del botón
                    sx={{
                      color:
                        theme.components.MuiButton.styleOverrides
                          .containedPrimary,
                    }}
                  >
                    {button.label}
                  </Button>
                ) : (
                  <Button
                    href={button.href}
                    sx={{
                      my: 2,
                      color:
                        theme.components.MuiButton.styleOverrides
                          .containedPrimary,
                      display: "block",
                      ml: index > 0 ? 1 : 0,
                    }}
                  >
                    {button.label}
                  </Button>
                )}
                {button.menuItems && (
                  <Menu
                    id={`menu-${index}`}
                    anchorEl={anchorEl[index]} // Usar el estado específico para este botón
                    open={Boolean(anchorEl[index])}
                    onClose={() => handleClose(index)} // Pasar el índice del botón
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {button.menuItems.map((menuItem, menuItemIndex) => (
                      <MenuItem
                        key={menuItemIndex}
                        onClick={() => {
                          handleClose(index);
                        }}
                      >
                        <Link
                          to={menuItem.href}
                          style={{ textDecoration: "none" }}
                        >
                          {menuItem.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
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
