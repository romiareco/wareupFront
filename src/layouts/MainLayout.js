import React, { useState } from "react";
import { Logout } from "../components/Logout";
import { UserProfileButton } from "../components/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import theme from "../theme/theme";

export function MainLayout(props) {
  const { children, isAdmin } = props;
  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, index) => {
    // Establecer el estado de anclaje específico para este botón
    setAnchorEl({ ...anchorEl, [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    // Cerrar el menú desplegable específico para este botón
    setAnchorEl({ ...anchorEl, [index]: null });
  };


  const buttons = isAdmin
    ? [
        {
          label: "Usuarios",
          href: "/admin/manage-users",
          icon: <PeopleAltRoundedIcon />,
        },
        {
          label: "Depósitos",
          icon: <WarehouseRoundedIcon />,
          menuItems: [
            { label: "Publicar depósito", href: "/admin/register-deposit" },
            { label: "Listado de depósitos", href: "/admin/manage-deposits" },
          ],
        },
        {
          label: "Solicitudes",
          icon: <WatchLaterRoundedIcon />,
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
      ]
    : [
        {
          label: "Tengo espacio",
          href: "/users/request-deposit",
          icon: <AddBusinessRoundedIcon />,
        },
        {
          label: "Depósitos",
          href: "/users/my-deposits",
          icon: <WarehouseRoundedIcon />,
        },
        {
          label: "Empresas",
          href: "/users/my-companies",
          icon: <BusinessRoundedIcon />,
        },
        {
          label: "Solicitudes",
          icon: <WatchLaterRoundedIcon />,

          menuItems: [
            {
              label: "Solicitudes de registro",
              href: "/users/my-deposit-requests",
            },
            {
              label: "Solicitudes de arrendamiento",
              href: "/users/booking-requests",
            },
          ],
        },
      ];


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              href={isAdmin ? "/admin/home" : "/users/home"}
              color={"inherit"}
            >
              <HomeRoundedIcon sx={{ fontSize: "36px" }} />
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
                      display: "flex", // Centra verticalmente los elementos
                      alignItems: "center", // Centra verticalmente los elementos
                    }}
                  >
                    {button.icon && (
                      <span style={{ marginRight: "8px" }}>{button.icon}</span>
                    )}
                    <span style={{ fontSize: "inherit" }}>{button.label}</span>{" "}
                    {/* Ajusta el tamaño del texto */}
                  </Button>
                ) : (
                  <Button
                    href={button.href}
                    sx={{
                      my: 2,
                      color:
                        theme.components.MuiButton.styleOverrides
                          .containedPrimary,
                      ml: index > 0 ? 1 : 0,
                      display: "flex", // Centra verticalmente los elementos
                      alignItems: "center", // Centra verticalmente los elementos
                    }}
                  >
                    {button.icon && (
                      <span style={{ marginRight: "8px" }}>{button.icon}</span>
                    )}
                    <span style={{ fontSize: "inherit" }}>{button.label}</span>{" "}
                    {/* Ajusta el tamaño del texto */}
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
                          handleClose();
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
