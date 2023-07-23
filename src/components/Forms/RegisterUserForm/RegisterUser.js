import { LoadingButton } from "@mui/lab";
import { Checkbox, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../api/user";
import { initialValues, validationSchema } from "./RegisterUser.form";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../../Copyright";
import theme from "./../../../theme/theme"; // Importa el theme.js aquí

const userController = new User();

export function RegisterUser() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await userController.register(formValue);
        navigate("/users/login");
      } catch (error) {
        setError("Error en el servidor", error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            Crear nueva cuenta
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
                  label="Nombre"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="lastName"
                  label="Apellido"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.errors.lastName}
                  helperText={formik.errors.lastName}
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
                  name="password"
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                  helperText={formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="repeatPassword"
                  type="password"
                  label="Repetir contraseña"
                  variant="outlined"
                  required
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  error={formik.errors.repeatPassword}
                  helperText={formik.errors.repeatPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="conditionsAccepted"
                      color="primary"
                      onChange={formik.handleChange}
                      checked={formik.values.conditionsAccepted}
                      error={formik.errors.conditionsAccepted}
                      helperText={formik.errors.conditionsAccepted}
                    />
                  }
                  label="He leído y acepto las poíticas de privacidad."
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  variant="contained"
                >
                  Registrarse
                </LoadingButton>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/")}
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
