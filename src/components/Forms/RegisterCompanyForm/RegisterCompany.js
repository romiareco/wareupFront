import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../api/company";
import { initialValues, validationSchema } from "../Forms/Company.form";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../../Copyright";
import { blue } from "@mui/material/colors";
import { useAuth } from "../../../hooks";
import theme from "./../../../theme/theme"; // Importa el theme.js aquí
import { NotificationSnackbar } from "../../NotificationSnackbar";

const companyController = new Company();

export function RegisterCompany() {
  const { accessToken, user } = useAuth();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, {resetForm}) => {
      try {
        await companyController.register(accessToken, user, formValue);
        //TODO: redirigirnos a las empresas
        //TODO: definir que debe pasar cuando se registra un nuevo espacio. Seguimos en registrar espacios? O redireccionamos a otro lado?

        setNotificationMessage(
          "Empresa registrada exitosamente"
        );
        setNotificationSeverity("success");
        setNotificationOpen(true);

        resetForm();
      } catch (error) {
        const errorMessage =
        "Error en el servidor: " + JSON.stringify(error.message);
        setNotificationMessage(errorMessage);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
              <Grid item md={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="contactName"
                  label="Nombre completo"
                  variant="outlined"
                  required
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  error={formik.errors.contactName}
                  helperText={formik.errors.contactName}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  name="position"
                  label="Cargo"
                  variant="outlined"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  error={formik.errors.position}
                  helperText={formik.errors.position}
                />
              </Grid>
              <Grid item md={12}>
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
              <Grid item md={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="RUT"
                  label="RUT"
                  variant="outlined"
                  required
                  value={formik.values.RUT}
                  onChange={formik.handleChange}
                  error={formik.errors.RUT}
                  helperText={formik.errors.RUT}
                />
              </Grid>
              <Grid item md={12}>
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
              <Grid item md={12}>
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
              <Grid item md={12}>
                <TextField
                  fullWidth
                  name="phone"
                  type="tel"
                  label="Celular/Teléfono"
                  variant="outlined"
                  required
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.errors.phone}
                  helperText={formik.errors.phone}
                />
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
