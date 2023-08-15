import React from "react";
import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import banner from "../../../assets/official-images/banner-1.jpg";
import { Paper, Box } from "@mui/material";
import { SignUpButton } from "../../Button";

export function Slogan() {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          ...theme.welcomePage.sloganPaper,
          backgroundImage: `url(${banner})`,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            ...theme.typography.montserratFont,
            textAlign: "right", // Alinea el texto a la izquierda
          }}
        >
          La logística para todos.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            ...theme.typography.montserratFont,
            textAlign: "right", // Alinea el texto a la izquierda
          }}
        >
          +Flexible +Confiable +Simple
        </Typography>
        <Box textAlign="right" marginTop="16px">
          <SignUpButton textName={"EMPEZAR AHORA"} />
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
