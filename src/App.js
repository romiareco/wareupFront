import React from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter } from "./router";
import { AuthProvider } from "./contexts";
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme/theme'; // Ajusta la ruta del import

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <WebRouter />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
