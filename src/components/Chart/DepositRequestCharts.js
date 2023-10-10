import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { DepositRequestStatusChart } from "./DepositRequestStatusChart/DepositRequestStatusChart";
import { DepositRequestRegistrationByMonthChart } from "./DepositRequestRegistrationByMonthChart/DepositRequestRegistrationByMonthChart";

export function DepositRequestCharts() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={3} margin={2}>
          <Grid
            item
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "400px",
            }}
          >
            <DepositRequestStatusChart />
          </Grid>
          <Grid item md={6}>
            <DepositRequestRegistrationByMonthChart />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
