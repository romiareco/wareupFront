import { Typography, Box, Divider } from "@mui/material";
import { UserCompaniesTable } from "../../components/Tables";
import { RegisterCompanyButton } from "../../components/Button";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";

export function UserCompanies() {
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        paddingBottom: "40px",
        paddingTop: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          ...theme.typography.montserratFont,
        }}
      >
        Mis empresas
      </Typography>
      <Divider light variant="middle" sx={{ borderBottomWidth: "3px" }} />
      <Box
        padding={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterCompanyButton />
        <UserCompaniesTable />
      </Box>
    </Box>
    <Footer />
  </ThemeProvider>
  );
}
