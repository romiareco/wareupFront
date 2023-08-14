import React from "react";
import { Logout } from "../components/Logout";
import { UserProfileButton } from "../components/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

export function UserLayout(props) {
  const { children } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Definir la lista de botones
  const buttons = [
    { label: "Tengo espacio", href: "/users/has-storage" },
    { label: "Gestionar mis espacios", href: "/users/my-storages" },
    { label: "Gestionar mis empresas", href: "/users/my-companies" },
    { label: "Contactanos", href: "/users/contacts" },
  ];

  return (
    <div className="user-layout">
      <div className="user-layout__right">
        <div className="u-header">
          <AppBar position="static">
            <Box width="100%"> {/* Hacer que la Toolbar ocupe todo el ancho del monitor */}
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/users/home"
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
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: 2 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      right: 0, // Alinear el menú hacia la derecha
                      "& .MuiListItem-root": {
                        color: theme.palette.text.primary,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <UserProfileButton />
                    <Logout />
                  </Menu>
                </Box>
              </Toolbar>
            </Box>
          </AppBar>
        </div>
        <div className="user-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
