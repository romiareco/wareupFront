import { useLocation } from "react-router-dom";
import { DepositsMap } from "../../components/Maps";
import { Box, Stack, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import { TopHomeBar } from "../../components/Home";
import { DepositsSearch, QuickSearcher } from "../../components/Searcher";

export function Searcher() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  let filters = {
    status: 1,
  }

  if (queryParams.length > 0) {
    const cityValue = queryParams.get("city");
    const departmentValue = queryParams.get("department");

    filters = {
      city: cityValue,
      department: departmentValue,
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <TopHomeBar />
      <Box>
        <QuickSearcher />
      </Box>
      <Stack direction={"row"}>
        <Box>
          <DepositsSearch filters={filters} />
        </Box>
        <Box>
          <DepositsMap filters={filters} />
        </Box>
      </Stack>

      {/* DepositsSearch ocupará el 60% del ancho */}

      <Footer />
    </ThemeProvider>
  );
}

//TODO: ver si podemos agregar un listado básico con vista diferente de los depositos para esa city/barrio
