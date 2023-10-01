import React, { useState } from "react";
import { Logout } from "../components/Logout";
import { UserProfileButton } from "../components/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import theme from "../theme/theme";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";

export function UserLayout(props) {
  const { children } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const buttons = [
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
      icon: <HourglassEmptyRoundedIcon />,

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton href="/users/home" color="inherit">
              <HomeRoundedIcon sx={{ fontSize: "36px" }} />
            </IconButton>

            {buttons.map((button, index) => (
              <Box key={index}>
                {button.menuItems ? (
                  <Button
                    id={`menu-button-${index}`}
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={handleClick}
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
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
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
