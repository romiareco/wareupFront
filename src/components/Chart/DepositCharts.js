import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { DepositStatusChart } from "./DepositStatusChart";
import { DepositLocationChart } from "./DepositLocationChart";
import { DepositRegistrationByMonthChart } from "./DepositRegistrationByMonthChart";

export function DepositCharts() {
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
        <Grid
          container
          spacing={3}
          margin={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4}>
            <DepositStatusChart />
          </Grid>
          <Grid
            item
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "300px",
            }}
          >
            <DepositLocationChart />
          </Grid>
          <Grid item md={4}>
            <DepositRegistrationByMonthChart />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
