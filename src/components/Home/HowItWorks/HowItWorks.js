import React from "react";
import { ThemeProvider, Typography, Container } from "@mui/material";
import theme from "../../../theme/theme";
import howItWorks from "../../../assets/official-images/diagrama-principal-pc.jpg";
import { CardMedia } from "@mui/material";

export function HowItWorks() {
  return (
    <ThemeProvider theme={theme}>
      <Container fullWidth>
        <Typography
          variant="h5"
          sx={theme.typography.h5Custom} // Utiliza el estilo personalizado definido en theme.js
        >
          Generamos un impacto positivo en resultados empresariales de nuestros
          clientes, en dos{" "}
          <span style={{ color: "blue" }}>segmentos</span>:
        </Typography>
        <CardMedia
          component="img"
          image={howItWorks}
          alt="Diagrama principal"
        />
      </Container>
    </ThemeProvider>
  );
}
