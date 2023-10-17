import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function RegisterCompanyButton() {
  const theme = useTheme();

  return (
    <Button
      href="/my-companies/register"
      variant="outlined"
      color="primary"
      sx={{
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        ml: 1,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      Registrar nueva empresa
    </Button>
  );
}
