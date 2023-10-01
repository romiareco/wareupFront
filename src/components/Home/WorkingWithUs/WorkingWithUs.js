import { ThemeProvider, Typography, Box } from "@mui/material";
import * as React from "react";
import theme from "../../../theme/theme";
import { Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

import lot from "../../../assets/official-images/LOT.jpeg";
import lasMarias from "../../../assets/official-images/las_marias.jpg";
import red from "../../../assets/official-images/red.png";
import sur from "../../../assets/official-images/SUR-LOGISTICA-CROPPED-scaled.jpg";
import megaFox from "../../../assets/official-images/megafox-rounded.png";
import encargo from "../../../assets/official-images/logo_para_sistema_horizontal.png";

export function WorkingWithUs() {
  const clients = [
    { src: lot, alt: "LOT" },
    { src: lasMarias, alt: "Las Marías" },
    { src: red, alt: "Red" },
    { src: sur, alt: "Súr" },
    { src: megaFox, alt: "MegaFox" },
    { src: encargo, alt: "Encargo" },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <Typography variant="h6">
          Algunas de las empresas que trabajan con nosotros
        </Typography>
        <Box component="section" pt={3} pb={8}>
          <Container>
            <Grid container spacing={2}>
              {clients.map((client, index) => (
                <Grid item md={2} key={index}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    style={{ width: "100%" }}
                  >
                    <Box
                      component="img"
                      src={client.src}
                      alt={client.alt}
                      width="100%"
                      opacity={0.7}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
