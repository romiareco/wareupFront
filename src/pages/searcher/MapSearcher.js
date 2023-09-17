import { useLocation } from "react-router-dom";
import { DepositsMap } from "../../components/Maps";
import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import { TopHomeBar } from "../../components/Home";

export function MapSearcher() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const cityValue = queryParams.get("city");
  const departmentValue = queryParams.get("department");

  return (
    <ThemeProvider theme={theme}>
      <TopHomeBar />
      <Typography
        variant="h4"
        sx={theme.typography.montserratFont}
        paddingTop={2}
      >
        Depósitos registrados
      </Typography>
      
      <DepositsMap city={cityValue} department={departmentValue} />
      <Footer />
    </ThemeProvider>
  );
}

//TODO: ver si podemos agregar un listado básico con vista diferente de los depositos para esa city/barrio