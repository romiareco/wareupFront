import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export function UserProfileButton() {
    const navigate = useNavigate();
  
    const userProfile = () => {
      console.log("Entre a autogestionar el perfil del usuario")
      navigate("/users/profile");
    };
  
    return (
      <MenuItem onClick={userProfile}>
      <Typography textAlign="center">Autogestión de perfil</Typography>
    </MenuItem>
    );
  }
  