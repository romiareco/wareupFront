import * as React from "react";
import Box from "@mui/material/Box";
import { Copyright } from "../Copyright";
import { Container, Grid, Link, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";

export function Footer() {
  
  return (
    <ThemeProvider theme={theme}>
      <footer>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography>
                A short description about your company and its values.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Link href="#" >
                Home
              </Link>
              <br />
              <Link href="#" >
                About
              </Link>
              <br />
              <Link href="#">
                Services
              </Link>
              <br />
              <Link href="#" >
                Contact
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography>1234 Street, City</Typography>
              <Typography>Email: info@example.com</Typography>
              <Typography>Phone: (123) 456-7890</Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </ThemeProvider>
  );
}

/* return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    );*/
