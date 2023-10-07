import Button from "@mui/material/Button";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material/styles";

export function SignUpButton({textName}) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        href="/register"
        variant="outlined"
        color="secondary" // Usa el color secundario definido en el theme.js
        sx={{
          borderColor: theme.palette.secondary.main, // Establece el borde del botón al color secundario
          ml: 1,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark, // Establece el color de fondo al color secundario oscuro al pasar el ratón por encima
          },
        }}
      >
        {textName}
      </Button>
    </ThemeProvider>
  );
}
