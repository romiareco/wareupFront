import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { CompanyStatusChart } from "./CompanyStatusChart/CompanyStatusChart";
import { CompanyRegistrationByMonthChart } from "./CompanyRegistrationByMonthChart/CompanyRegistrationByMonthChart";

export function CompanyCharts() {
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
          <Grid item md={6}>
            <CompanyStatusChart />
          </Grid>
          <Grid item md={6}>
            <CompanyRegistrationByMonthChart />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
