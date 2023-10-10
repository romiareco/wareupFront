import { ThemeProvider, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import { Divider } from "@mui/material";
import { UserRequestRegisterDepositTable } from "../../components/Tables";
import banner from "../../assets/official-images/banner-1.jpg";
import { useEffect } from "react";

export function UserListRequestDeposits() {
  useEffect(() => {
    document.title = "Solicitudes de registro de depósitos";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          paddingBottom: "40px",
          paddingTop: "20px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" marginBottom={3}>
          Solicitudes de registro de nuevo depósito{" "}
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
          <UserRequestRegisterDepositTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
