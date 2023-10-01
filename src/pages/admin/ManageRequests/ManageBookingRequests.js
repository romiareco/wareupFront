import { ThemeProvider, Typography, Box, Divider } from "@mui/material";
import banner from "../../../assets/official-images/banner-1.jpg";

import theme from "../../../theme/theme";
import { Footer } from "../../../components/Footer";
import { RegisteredBookingRequestsTable } from "../../../components/Tables";

export function ManageBookingRequests() {
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
          Solicitudes de arrendamiento
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
          <RegisteredBookingRequestsTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
