import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";


export function TopHomeBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              WARE UP
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}