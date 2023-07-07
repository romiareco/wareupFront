import React from "react";
import { Logout } from "../../components/Logout";
import { UserProfile } from "../../components/UserProfile";
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
import { RequestStorageForm } from "../../components/Forms";

export function UserLayout(props) {
  const { children } = props;

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="user-layout">
      <div className="user-layout__right">
        <div className="u-header">
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/home"
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
                    href="/users/has-storage"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Tengo espacio
                  </Button>
                  <Button
                    href="/users/my-storages"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Gestionar mis espacios
                  </Button>
                  <Button
                    href="/contacts"
                    sx={{ my: 2, color: "white", display: "block" }}
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
                    <UserProfile />
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
