import { Box, Stack, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { TopHomeBar } from "../Home";
import { QuickSearcher } from "./QuickSearcher";
import { DepositsSearch } from "./DepositsSearch";
import { Footer } from "../Footer";

export function SearcherView({ filters }) {
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
          <DepositsSearch filters={filters} />
        </Box>
        <Box>{/* <DepositsMap filters={filters} /> */}</Box>
      </Stack>
      <Footer />
    </ThemeProvider>
  );
}
