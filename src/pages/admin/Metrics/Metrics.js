import { Box, ThemeProvider, Typography } from "@mui/material";
import {
  DepositLocationChart,
  DepositStatusChart,
} from "../../../components/Chart";
import theme from "../../../theme/theme";

export function Metrics() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography variant="h4" marginTop={2}>
          Depósitos
        </Typography>
        <Box width={"100%"}>
          <Box width={"40%"} margin={2}>
            <DepositStatusChart />
          </Box>
          <Box width={"40%"} margin={2}>
            <DepositLocationChart />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
