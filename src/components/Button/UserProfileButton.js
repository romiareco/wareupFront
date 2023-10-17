import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Popover, IconButton } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export function UserProfileButton() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const userProfile = () => {
    navigate("/profile");
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        onClick={userProfile}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <AccountCircleRoundedIcon />
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
        <Typography sx={{ p: 1 }}>Perfil</Typography>
      </Popover>
    </Box>
  );
}
