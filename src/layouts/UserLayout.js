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
import { PublicationView } from "../pages";

export function UserLayout(props) {
  const { children } = props;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const buttons = [
    { label: "Tengo espacio", href: "/users/request-deposit" },
    {
      label: "Gestionar mis espacios",
      menuItems: [
        {
          label: "Listado de solicitudes de depósito",
          href: "/users/my-deposit-requests",
        },
        { label: "Listado de depósitos", href: "/users/my-deposits" },
      ],
    },
    { label: "Gestionar mis empresas", href: "/users/my-companies" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePublic = () => {
    const id = 1;
    return <PublicationView depositId={id} />;
  };
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

            <Button
              sx={{
                my: 2,
                color:
                  theme.components.MuiButton.styleOverrides.containedPrimary,
                display: "block",
              }}
              component={Link} // Usa el componente Link en lugar de href
              to="/users/publication-view?id=1" // Cambia el valor del depositId si es dinámico
            >
              Publicacion
            </Button>
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
