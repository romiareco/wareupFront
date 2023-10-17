import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter } from "./router";
import { AuthProvider } from "./contexts";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme"; // Ajusta la ruta del import

export default function App() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-6VSKW5M7PF");
  }, []);

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
