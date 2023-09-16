import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import theme from "../theme/theme";
import { LoginButton, SignUpButton } from "../components";

export function PublicLayout(props) {
  const { children } = props;

  <ThemeProvider theme={theme}>
    <Box>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              marginLeft: "auto",
            }}
          >
            <LoginButton />
            <SignUpButton textName={"Registrarse"} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    <Box>{children}</Box>
  </ThemeProvider>;
}
