import Box from "@mui/material/Box";
import { Copyright } from "../Copyright";
import { Container, Grid, Link, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import { LinkedinLogo } from "../SocialMedia";
import { LogoAvatar } from "../Avatars/LogoAvatar";
import { LinkSpacer } from "../Links"; // Importa el nuevo componenteç
import logo from "../../assets/official-images/logo.png";
 
export function Footer() {
  return (
    <ThemeProvider theme={theme}>
       <Box
        component="footer"
        sx={{
          paddingTop: theme.spacing(3),
          width: "100%",
          backgroundColor: theme.palette.footer.main,
          padding: theme.spacing(3),
        }}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container spacing={1}>
              <Grid item md={3}>
                <LogoAvatar logo={logo} width={120} />
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" gutterBottom>
                  Empresa
                </Typography>
                <Typography variant="link">
                  <Link href="/">Home</Link>
                </Typography>
                <LinkSpacer />
                <Typography variant="link">
                  <Link href="#">Quienes somos</Link>
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" gutterBottom>
                  Ayuda & Soporte
                </Typography>
                <Typography variant="link">
                  <Link href="/contacts">Contáctanos</Link>
                </Typography>
                <LinkSpacer />
                <Typography variant="link">
                  <Link href="#">Términos y condiciones</Link>
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" gutterBottom>
                  Social Media
                </Typography>
                <LinkedinLogo />
              </Grid>
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
