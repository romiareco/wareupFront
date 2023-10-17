import Button from "@mui/material/Button";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material/styles";

export function SignUpButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button
        href="/register"
        variant="outlined"
        color="secondary"
        sx={{
          borderColor: theme.palette.secondary.main,
          ml: 1,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
      >
        Registrarse
      </Button>
    </ThemeProvider>
  );
}
