import { Box, ThemeProvider } from "@mui/system";
import React from "react";
import { RegisterDeposit } from "../../components/Forms/RegisterDepositForm";
import { Typography } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";

export function RegisterDeposits() {
  return (
    <ThemeProvider theme={theme}>
      <Box padding={3}>
        <Typography variant="h6">Registro de nuevo depósito</Typography>
        <RegisterDeposit />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
