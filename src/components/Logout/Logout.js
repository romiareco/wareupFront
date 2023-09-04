import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { IconButton, Box, Popover, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box>
      <IconButton
        onClick={onLogout}
        onMouseEnter={handlePopoverOpen}
        color="inherit"
        onMouseLeave={handlePopoverClose}
      >
        <LogoutRoundedIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Cerrar sesión</Typography>
      </Popover>
    </Box>
  );
}
