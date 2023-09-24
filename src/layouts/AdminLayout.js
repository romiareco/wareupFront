import React, { useState } from "react";
import { Logout } from "../components/Logout";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Button, Box, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from 'react-router-dom';


export function AdminLayout(props) {
  const { children } = props;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const buttons = [
    { label: "Gestionar usuarios", href: "/admin/manage-users" },
    {
      label: "Gestionar depósitos",
      menuItems: [
        { label: "Publicar depósito", href: "/admin/register-deposit" },
        { label: "Listado de depósitos", href: "/admin/manage-deposits" },
      ],
    },
    { label: "Gestionar solicitudes", href: "/admin/manage-requests" },
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
                    onClick={handleClick}
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
    <Link to={menuItem.href} style={{ textDecoration: 'none' }}>{menuItem.label}</Link>
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
