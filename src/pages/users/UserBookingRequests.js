import { ThemeProvider, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import { Divider } from "@mui/material";
import { UserBookingRequestsTable } from "../../components/Tables";

export function UserBookingRequests() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingTop: "20px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center", 
        }}
      >
        <Typography variant="h4" marginBottom={3}>Solicitudes de arrendamiento</Typography>
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
          <UserBookingRequestsTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
