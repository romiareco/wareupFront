import React from "react";
import { TextField, Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../Forms/Contact.form";
import { Contact } from "../../../api";
import { LoadingButton } from "@mui/lab";
import { Avatar, CssBaseline, Typography, Container } from "@mui/material";
import theme from "../../../theme/theme";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

const contactController = new Contact();

export function ContactForm() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue, { resetForm }) => {
      try {
        await contactController.contact(formValue);

        setNotificationMessage("Mensaje enviado exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        resetForm();
      } catch (error) {
        const errorMessage =
          "Error en el servidor: " + JSON.stringify(error.message);
        console.log(errorMessage);
        setNotificationMessage(errorMessage);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ width: "100%" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
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
                  type="text"
                  name="subject"
                  label="Asunto"
                  variant="outlined"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={formik.errors.subject}
                  helperText={formik.errors.subject}
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

            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ mt: "16px" }}
            >
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
                  onClick={() => formik.resetForm()}
                >
                  Cancelar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
