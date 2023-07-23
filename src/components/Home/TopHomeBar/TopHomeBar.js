import { AppBar, Toolbar, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
import React from "react";

export function TopHomeBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            href="/users/login"
            variant="outlined"
            color="secondary" // Usa el color secundario definido en el theme.js
            sx={{
              borderColor: theme.palette.secondary.main, // Establece el borde del botón al color secundario
              mr: 1,
              ml: 1,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark, // Establece el color de fondo al color secundario oscuro al pasar el ratón por encima
              },
            }}
          >
            Iniciar sesión
          </Button>
          <Button
            href="/users/register"
            variant="outlined"
            color="secondary" // Usa el color secundario definido en el theme.js
            sx={{
              borderColor: theme.palette.secondary.main, // Establece el borde del botón al color secundario
              ml: 1,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark, // Establece el color de fondo al color secundario oscuro al pasar el ratón por encima
              },
            }}
          >
            Registrarse
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
