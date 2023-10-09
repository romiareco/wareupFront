import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { BookingRequestStatusChart } from "./BookingRequestStatusChart";
import { BookingRequestRegistrationByMonthChart } from "./BookingRequestRegistrationByMonthChart";

export function BookingRequestCharts() {
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
            <BookingRequestStatusChart />
          </Grid>
          <Grid item md={6}>
            <BookingRequestRegistrationByMonthChart />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
