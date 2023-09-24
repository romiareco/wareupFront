import { Box, CircularProgress, Stack, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { TopHomeBar } from "../Home";
import { QuickSearcher } from "./QuickSearcher";
import { DepositsSearch } from "./DepositsSearch";
import { Footer } from "../Footer";
import { DepositsMap } from "../Maps";
import { useState } from "react";

export function SearcherView({ filters }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <TopHomeBar />
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <QuickSearcher />
      </Box>
      <Stack direction={"row"} marginLeft={4}>
        <Box>
          <DepositsSearch filters={filters} setIsLoading={setIsLoading} />
        </Box>
        <Box>
          <DepositsMap filters={filters} />
        </Box>
      </Stack>
      <Footer />
      {isLoading && ( // Muestra CircularProgress mientras isLoading es true
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 9999, // Asegura que esté por encima de otros elementos
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </ThemeProvider>
  );
}


