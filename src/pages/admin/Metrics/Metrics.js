import { Box, ThemeProvider, Divider, Typography } from "@mui/material";
import {
  CompanyCharts,
  DepositCharts,
  UserCharts,
  BookingRequestCharts,
  DepositRequestCharts,
} from "../../../components/Chart";
import theme from "../../../theme/theme";
import { Footer } from "../../../components/Footer";

export function Metrics() {
  return (
    <ThemeProvider theme={theme}>
      <Box marginLeft={2} marginRight={2} marginTop={4}>
        <Divider>
          <Typography variant="h6" fontWeight="bold">
            Depósitos
          </Typography>
        </Divider>
        <DepositCharts />
        <Divider>
          <Typography variant="h6" fontWeight="bold">
            Solicitudes de registro de depósitos
          </Typography>
        </Divider>

        <DepositRequestCharts />
        <Divider>
          <Typography variant="h6" fontWeight="bold">
            Empresas{" "}
          </Typography>
        </Divider>
        <CompanyCharts />
        <Divider>
          <Typography variant="h6" fontWeight="bold">
            Usuarios{" "}
          </Typography>
        </Divider>
        <UserCharts />
        <Divider>
          <Typography variant="h6" fontWeight="bold">
            Solicitudes de arrendamiento{" "}
          </Typography>
        </Divider>

        <BookingRequestCharts />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
