import React from "react";
import { Footer } from "../../components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import { Searcher } from "../../components/Searcher";

export function UserHome() {
  return (
    <ThemeProvider theme={theme}>
      <Searcher />
      <Footer />
    </ThemeProvider>
  );
}
