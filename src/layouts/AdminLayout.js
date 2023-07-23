import React from "react";
import { Logout } from "../components/Logout";
import { UserProfileBttn } from "../components/Buttons";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";


export function AdminLayout(props) {
    const { children } = props;
  
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
      <div className="admin-layout">
        <div className="admin-layout__right">
          <div className="u-header">
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/admin/home"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
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
                    <Button
                      href="/admin/manage-users"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        ml: 1,
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      Gestionar usuarios
                    </Button>
                    <Button
                      href="/admin/manage-deposits"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        ml: 1,
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      Gestionar depósitos
                    </Button>
                    <Button
                      href="/admin/manage-requests"
                      sx={{ my: 2, color: "white", display: "block",  ml: 1,
                      "&:hover": {
                        backgroundColor: "#0056b3",
                      }, }}
                    >
                      Gestionar solicitudes
                    </Button>
                    <Button
                      href="/contacts"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        ml: 1,
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      Contactanos
                    </Button>
                  </Box>
  
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
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
                      <UserProfileBttn />
                      <Logout />
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          </div>
          <div className="user-layout__right-content">{children}</div>
        </div>
      </div>
    );
  }
  