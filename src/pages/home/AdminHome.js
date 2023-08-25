import React from "react";
import { SiteUnderConstruction } from "../../components";
import { Footer } from "../../components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import theme from "../../theme/theme";

export function AdminHome() {
  <ThemeProvider theme={theme}>
    <Typography variant="h5" sx={theme.typography.montserratFont}>
      Acá van a ir las métricas del sitio{" "}
    </Typography>
    <SiteUnderConstruction />
    <Footer />
  </ThemeProvider>;
}
