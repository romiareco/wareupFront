import { Box, styled } from "@mui/system";
import { topBarHeight } from "../../../utils/constant";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Span } from "../../Typography";
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

const Topbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#007bff", // Cambia este color a tu tono azul elegante deseado
}));

export function TopHomeBar() {
  return (
    <Topbar position="fixed">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "#ffffff", borderColor: "#ffffff", mr: 1 }}
        >
          Iniciar sesión
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "#ffffff", borderColor: "#ffffff" }}
        >
          Registrarse
        </Button>
      </Toolbar>
    </Topbar>
  );
}
