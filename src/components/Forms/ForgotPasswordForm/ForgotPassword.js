import { Box, Grid, styled, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { User } from "../../../api/user";
import { useFormik } from "formik";
import { validationSchema, inititalValues } from "../Forms/ForgotPassword.form";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { ThemeProvider } from "@mui/material/styles";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import theme from "../../../theme/theme";
import { NotificationSnackbar } from "../../NotificationSnackbar";

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const userController = new User();

export function ForgotPassword() {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'

  const formik = useFormik({
    initialValues: inititalValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        await userController.recoverPassword(formValue);

        setNotificationMessage(
          "Solicitud de reinicio de contraseña enviado exitosamente"
        );
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
        resetForm();
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          md={7}
          sx={{
            backgroundImage:
              "url(https://wareup.com.uy/wp-content/uploads/2021/07/banner-1.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockResetOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recuperar contraseña
            </Typography>
            <ContentBox>
              <Form onSubmit={formik.handleSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  value={formik.values.email}
                  variant="outlined"
                  onChange={formik.handleChange}
                  sx={{ mb: 3, width: "100%" }}
                  error={formik.errors.email}
                  helperText={formik.errors.email}
                />
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
                      onClick={() => navigate(-1)}
                    >
                      Cancelar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            </ContentBox>
          </Box>
        </Grid>
      </Grid>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
