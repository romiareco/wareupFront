import { LoadingButton } from "@mui/lab";
import { Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "../../Typography";
import { useAuth } from "../../../hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema, inititalValues } from "./Login.form";
import { Auth } from "../../../api";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
import { role } from "../../../utils";
import { NotificationSnackbar } from "../../NotificationSnackbar";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const authController = new Auth();

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'

  const formik = useFormik({
    initialValues: inititalValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);

        authController.setAccessToken(response.tokens.access);
        authController.setRefreshToken(response.tokens.refresh);

        const userLogged = await login(response.tokens.access);

        if (userLogged) {
          if (parseInt(userLogged.role) === role.ADMIN) {
            navigate("/admin/home");
          } else {
            navigate("/users/home");
          }
        }
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <ContentBox>
              <Form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.errors.email}
                  helperText={formik.errors.email}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  size="small"
                  name="password"
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                  helperText={formik.errors.password}
                  sx={{ mb: 1.5 }}
                />

                <FlexBox justifyContent="space-between">
                  <FlexBox gap={1}>
                    <Checkbox
                      size="small"
                      name="remember"
                      onChange={formik.handleChange}
                      checked={formik.values.remember}
                      sx={{ padding: 0 }}
                    />

                    <Paragraph>Recuerdame</Paragraph>
                  </FlexBox>

                  <NavLink
                    to="/users/forgot-password"
                    style={{ color: "green" }}
                  >
                    ¿Olvidaste tu contraseña?
                  </NavLink>
                </FlexBox>

                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Login
                </LoadingButton>

                <LoadingButton
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/")}
                  sx={{ my: 2, ml: 1 }}
                >
                  Cancelar
                </LoadingButton>
                <Paragraph>
                  ¿No tienes una cuenta?
                  <NavLink
                    to="/users/register"
                    style={{ color: "green", marginLeft: 5 }}
                  >
                    Registrarse
                  </NavLink>
                </Paragraph>
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
