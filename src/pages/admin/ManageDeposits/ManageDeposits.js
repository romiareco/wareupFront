import { ThemeProvider, Typography, Box } from "@mui/material";
import { RegisteredDepositsTable } from "../../../components/Tables";
import banner from "../../../assets/official-images/banner-1.jpg";
import theme from "../../../theme/theme";
import { Footer } from "../../../components/Footer";
import { Divider } from "@mui/material";
import { useEffect } from "react";

export function ManageDeposits() {
  useEffect(() => {
    document.title = "Gestión de depósitos";
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
        <Typography variant="h4" color="white" marginBottom={3}>
          Depósitos registrados
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
          <RegisteredDepositsTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
