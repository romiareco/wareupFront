import { ThemeProvider, Typography, Box, Divider } from "@mui/material";
import { RegisteredUsersTable } from "../../../components/Tables";
import banner from "../../../assets/official-images/banner-1.jpg";

import theme from "../../../theme/theme";
import { Footer } from "../../../components/Footer";

export function ManageUsers() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          paddingBottom: "40px",
          paddingTop: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
          }}
        >
          Usuarios registrados
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
          <RegisteredUsersTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
