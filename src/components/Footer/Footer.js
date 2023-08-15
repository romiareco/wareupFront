import * as React from "react";
import Box from "@mui/material/Box";
import { Copyright } from "../Copyright";
import { Container, Grid, Link, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import { LinkedinLogo } from "../SocialMedia";
import { LogoAvatar } from "../Avatars/LogoAvatar";
import { LinkSpacer } from "../Links"; // Importa el nuevo componente

export function Footer() {
  return (
    <ThemeProvider theme={theme}>
      {/* Aplica el tema personalizado */}
      <Box // Utiliza el componente Box para cubrir todo el ancho del monitor
        component="footer"
        sx={{
          backgroundColor: theme.palette.footer.main,
          width: "100%",
          paddingTop: theme.spacing(3), // Ajusta el espaciado superior según tus necesidades
        }}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <LogoAvatar />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Empresa
              </Typography>
              <Typography variant="link">
                <Link href="/">Home</Link>
              </Typography>
              <LinkSpacer /> {/* Agrega el espacio aquí */}
              <Typography variant="link">
                <Link href="#">Quienes somos</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Ayuda & Soporte
              </Typography>
              <Typography variant="link">
                <Link href="/contacts">Contáctanos</Link>
              </Typography>
              <LinkSpacer /> {/* Agrega el espacio aquí */}
              <Typography variant="link">
                <Link href="#">Términos y condiciones</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              <LinkedinLogo />
            </Grid>
          </Box>
          <Box mt={2}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
