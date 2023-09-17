import React from "react";
import { ThemeProvider, Typography, Avatar } from "@mui/material";
import theme from "../../../theme/theme";
import howItWorks from "../../../assets/official-images/diagrama-principal-pc.jpg";
import { Box } from "@mui/material";

export function HowItWorks() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        margin={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={theme.typography.montserratFont}>
          Generamos un impacto positivo en resultados empresariales de nuestros
          clientes, en dos <span style={{ color: "#07259A" }}>segmentos</span>:
        </Typography>
        <Avatar
          alt="Diagrama principal"
          src={howItWorks}
          style={{
            width: "60%",
            height: "auto",
            borderRadius: "0",
            objectFit: "cover",
            marginTop: 5,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
