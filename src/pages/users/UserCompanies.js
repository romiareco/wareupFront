import { Typography } from "@mui/material";
import { UserCompaniesTable } from "../../components";
import { RegisterCompanyButton } from "../../components/Button";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";

export function UserCompanies() {
  return (
    <ThemeProvider theme={theme}>
      <Typography style={{ flex: 1 }}>Mis empresas</Typography>
      <RegisterCompanyButton />
      <UserCompaniesTable />
    </ThemeProvider>
  );
}
