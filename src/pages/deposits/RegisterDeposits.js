import { Box, ThemeProvider } from "@mui/system";
import React from "react";
import { RegisterDeposit } from "../../components/Forms/RegisterDepositForm";
import { Typography } from "@mui/material";
import theme from "../../theme/theme";

export function RegisterDeposits() {
  return (
    <ThemeProvider theme={theme}>
      <Box padding={3}>
        <Typography variant="h6" sx={theme.typography.montserratFont}>
          Registro de nuevo depósito
        </Typography>
        <RegisterDeposit />
      </Box>
    </ThemeProvider>
  );
}
