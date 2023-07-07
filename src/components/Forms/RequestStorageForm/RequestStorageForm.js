import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../api/user";
import { initialValues, validationSchema } from "./RequestStorage.form";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Paper, InputLabel, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../../Copyright";
import { blue } from "@mui/material/colors";
import { Select, MenuItem } from "@mui/material";

const userController = new User();

export function RequestStorageForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  //TODO: Ver si podemos guardar en la BD los barrios para hacer la request y no tenerlos hardcodeados
  const barrios = [{ value: "Malvin" }, { value: "Barrio Sur" }];

  const [barrio, setBarrio] = React.useState(barrios[0].value);

  const handleChange = (event) => {
    setBarrio(event.target.value);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await userController.requestStorageRegistration(formValue);
        //TODO: definir que debe pasar cuando se registra un nuevo espacio. Seguimos en registrar espacios? O redireccionamos a otro lado?
      } catch (error) {
        setError("Error en el servidor", error);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            padding: "16px",
            width: "100%",
          }}
        >
          <Paper
            sx={{
              padding: "16px",
              width: "100%",
              mb: 4,
              backgroundColor: blue[100],
            }}
          >
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              Te ofrecemos oportunidades flexibles para ocupar tu espacio de
              forma temporal y adecuada a tus necesidades
            </Typography>
          </Paper>
          <Typography component="h1" variant="h5">
            Datos del referente{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  label="Nombre completo"
                  variant="outlined"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  name="postition"
                  label="Cargo"
                  variant="outlined"
                  value={formik.values.postition}
                  onChange={formik.handleChange}
                  error={formik.errors.position}
                  helperText={formik.errors.position}
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
                  type="text"
                  name="rut"
                  label="RUT"
                  variant="outlined"
                  required
                  value={formik.values.rut}
                  onChange={formik.handleChange}
                  error={formik.errors.rut}
                  helperText={formik.errors.rut}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="businessName"
                  type="text"
                  label="Razón social"
                  variant="outlined"
                  required
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  error={formik.errors.businessName}
                  helperText={formik.errors.businessName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  type="text"
                  label="Dirección de facturación"
                  variant="outlined"
                  required
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.errors.address}
                  helperText={formik.errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  type="tel"
                  label="Celular/Teléfono"
                  variant="outlined"
                  required
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.errors.phoneNumber}
                  helperText={formik.errors.phoneNumber}
                />
              </Grid>
            </Grid>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ marginTop: "16px", marginBottom: "16px" }}
            >
              Datos del depósito
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="storageAddress"
                  label="Dirección"
                  variant="outlined"
                  required
                  value={formik.values.storageAddress}
                  onChange={formik.handleChange}
                  error={formik.errors.storageAddress}
                  helperText={formik.errors.storageAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  name="storagePhoneNumber"
                  label="Teléfono"
                  variant="outlined"
                  value={formik.values.storagePhoneNumber}
                  onChange={formik.handleChange}
                  error={formik.errors.storagePhoneNumber}
                  helperText={formik.errors.storagePhoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Barrio</InputLabel>
                  <Select value={barrio} label="Barrio" onChange={handleChange}>
                    {barrios.map((item) => (
                      <MenuItem value={item.value}>{item.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ marginTop: "16px" }}
            >
              <Grid item>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  variant="contained"
                >
                  Registrar
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
        <p className="register-form__error">{error}</p>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
