import React from "react";
import { SiteUnderConstruction } from "../../components/SiteUnderConstruction";
import { Footer } from "../../components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import theme from "../../theme/theme";
import { PublicationList } from "../../components/Searcher/PublicationList";

export function UserHome() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" sx={theme.typography.montserratFont}>
        Acá va a ir el buscador de publicaciones
      </Typography>
      <PublicationList />
      <Footer />
    </ThemeProvider>
  );
}
