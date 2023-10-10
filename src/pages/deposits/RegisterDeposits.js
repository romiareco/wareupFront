import { Box, ThemeProvider } from "@mui/system";
import React, { useEffect } from "react";
import { RegisterDeposit } from "../../components/Forms/RegisterDepositForm";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import banner from "../../assets/official-images/warehouse-1-scaled.jpg";

export function RegisterDeposits() {
  useEffect(() => {
    document.title = "Registro de depósito";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RegisterDeposit />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
