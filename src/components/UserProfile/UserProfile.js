import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export function UserProfile() {
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const onLogout = () => {
      logout();
      navigate("/");
    };
  
    return (
      <MenuItem onClick={onLogout}>
      <Typography textAlign="center">Autogestión de perfil</Typography>
    </MenuItem>
    );
  }
  