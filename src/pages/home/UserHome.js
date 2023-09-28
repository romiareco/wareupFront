import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import { SearcherView } from "../../components/Searcher";

export function UserHome() {
  const filters = {
    status: 1,
  };
  return (
    <ThemeProvider theme={theme}>
 {/*<SearcherView filters={filters} />*/}
    </ThemeProvider>
  );
}
