import React, { useState } from "react";
import { TextField, Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./Contact.form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Contact } from "../../../api";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Copyright } from "../../Copyright";

const contactController = new Contact();

export function ContactForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await contactController.contact(formValue);
        navigate(-1);
      } catch (error) {
        setError("Error en el servidor", error);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contactanos
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  required
                  label="Nombre"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.errors.email}
                  helperText={formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  type="tel"
                  name="phoneNumber"
                  label="Celular/Teléfono"
                  variant="outlined"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.errors.phoneNumber}
                  helperText={formik.errors.phoneNumber}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                  name="message"
                  label="Mensaje"
                  variant="outlined"
                  required
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={formik.errors.message}
                  helperText={formik.errors.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "8px",
                      fontSize: "16px",
                      resize: "vertical",
                      fontFamily: "inherit",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "16px" }}>
              <Grid item>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  variant="contained"
                >
                  Enviar
                </LoadingButton>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <p className="contacts-form__error">{error}</p>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
