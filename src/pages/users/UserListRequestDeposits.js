import { ThemeProvider, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";
import { Footer } from "../../components/Footer";
import { Button, Divider } from "@mui/material";
import {
  UserDepositsTable,
  UserRequestRegisterDepositTable,
} from "../../components/Tables";

export function UserListRequestDeposits() {
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
