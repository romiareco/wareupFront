import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export function UserProfile() {
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
  