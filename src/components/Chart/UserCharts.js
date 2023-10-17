import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { UserStatusChart } from "./UserStatusChart";
import { UserRoleChart } from "./UserRoleChart/UserRoleChart";
import { UserRegistrationByMonthChart } from "./UserRegistrationByMonthChart/UserRegistrationByMonthChart";

export function UserCharts() {
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
            <UserStatusChart />
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
            <UserRoleChart />
          </Grid>
          <Grid item md={4}>
            <UserRegistrationByMonthChart />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
