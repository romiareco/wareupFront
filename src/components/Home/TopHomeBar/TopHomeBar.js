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

//TODO: cambiar como estamos usando los botones con href y tener alguna variable que importemos y reutilicemos la declaración de URIs
export function TopHomeBar() {
  return (
    <Topbar position="fixed">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Button
          href="/users/login"
          variant="outlined"
          color="inherit"
          sx={{ color: "#ffffff", borderColor: "#ffffff", mr: 1 }}
        >
          Iniciar sesión
        </Button>
        <Button
          href="/users/register"
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
