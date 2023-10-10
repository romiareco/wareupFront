import { Typography, Box, Divider } from "@mui/material";
import { UserCompaniesTable } from "../../components/Tables";
import { RegisterCompanyButton } from "../../components/Button";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import banner from "../../assets/official-images/banner-1.jpg";
import { useEffect } from "react";

export function UserCompanies() {
  useEffect(() => {
    document.title = "Gestión de empresas";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          paddingBottom: "40px",
          paddingTop: "20px",
          justifyContent: "center",
          alignItems: "center", // Centra horizontalmente
          textAlign: "center", // Centra el contenido del Typography
        }}
      >
        <Typography variant="h4" marginBottom={3}>Mis empresas</Typography>
        <Divider light variant="middle" sx={{ borderBottomWidth: "3px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box padding={2}>
            <RegisterCompanyButton />
          </Box>
          <UserCompaniesTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
