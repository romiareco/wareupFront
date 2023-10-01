import { ThemeProvider, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import { Divider } from "@mui/material";
import { UserDepositsTable } from "../../components/Tables";

export function UserDeposits() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingBottom: "40px",
          paddingTop: "20px",
          justifyContent: "center",
          alignItems: "center", 
          textAlign: "center",
        }}
      >
        <Typography variant="h4" marginBottom={3}>Mis depósitos</Typography>
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
          <UserDepositsTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
