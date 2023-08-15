import { ThemeProvider, Typography, Box } from "@mui/material";
import { RegisteredUsersTable } from "../../../components";
import banner from "../../../assets/official-images/banner-1.jpg";

import theme from "../../../theme/theme";
import { Footer } from "../../../components/Footer";

export function ManageUsers() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${banner})`,
          paddingBottom: "40px",
          paddingTop: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...theme.typography.montserratFont,
            color: "white", // Alinea el texto a la izquierda
          }}
        >
          Usuarios registrados
        </Typography>
        <RegisteredUsersTable />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
