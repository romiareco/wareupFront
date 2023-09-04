import * as React from "react";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import needDeposit from "../../../assets/official-images/mercaderia-recortada.jpg";
import haveDeposit from "../../../assets/official-images/espacio-recortada.jpg";
import { ComplexButton } from "../../Button";

export function DepositManager() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px", // Ajusta el relleno superior según tus necesidades
          backgroundColor: "#F2F2F2",
        }}
      >
        <Typography variant="h4" sx={theme.typography.montserratFont}>
          ¿Cómo podemos ayudarte?
        </Typography>
        <Stack direction="row">
          <ComplexButton
            imageTitle={"NECESITO ESPACIO"}
            imageUrl={needDeposit}
            imageWidth={"500px"}
          />
          <ComplexButton
            imageTitle={"TENGO ESPACIO"}
            imageUrl={haveDeposit}
            imageWidth={"500px"}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

//TODO: dejar funcionando los botones
