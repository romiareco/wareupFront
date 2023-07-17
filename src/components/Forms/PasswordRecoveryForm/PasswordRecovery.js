import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../api/user";
import { initialValues, validationSchema } from "./PasswordRecovery.form";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../../Copyright";
import { useLocation } from "react-router-dom";

const userController = new User();

export function PasswordRecovery() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const location = useLocation();
  const tokenParam = location.search.substring(1); // Eliminar el primer caracter "?" de la búsqueda

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await userController.updatePassword(formValue, tokenParam);
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
            Ingrese una contraseña nueva
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
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  variant="contained"
                >
                  Confirmar
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
        <p className="reset_password-form__error">{error}</p>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
