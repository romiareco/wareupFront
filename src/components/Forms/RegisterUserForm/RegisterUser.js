import { LoadingButton } from "@mui/lab";
import { Checkbox, Grid, TextField, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../api/user";
import { initialValues, validationSchema } from "../Forms/User.form";
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
import { NotificationSnackbar } from "../../Snackbar";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { LoginDialog } from "../../Dialogs/LoginDialog/LoginDialog";

const userController = new User();

export function RegisterUser() {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [anchorEl, setAnchorEl] = useState(null);
  const isPopoverOpen = Boolean(anchorEl);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        await userController.register(formValue);
        setNotificationMessage("Usuario registrado exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        window.gtag("event", "register", {
          event_category: "Registrations",
          event_label: "User registration",
        });

        resetForm();
        setShowLoginDialog(true);
      } catch (error) {
        const errorMessage = "Error: " + JSON.stringify(error.message);
        setNotificationMessage(errorMessage);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    },
  });

  const handleOpenLoginDialog = (isOpen) => {
    setShowLoginDialog(isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 3,
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
              <Grid item md>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item md>
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
              <Grid item md={12}>
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
              <Grid item md={12}>
                <Stack direction="row" alignItems="center">
                  <TextField
                    fullWidth
                    name="industry"
                    type="text"
                    label="Industrias con las que estoy familiarizada/o"
                    variant="outlined"
                    required
                    value={formik.values.industry}
                    onChange={formik.handleChange}
                    error={formik.errors.industry}
                    helperText={formik.errors.industry}
                  />
                  <IconButton
                    aria-owns={isPopoverOpen ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <HelpOutlineIcon />
                  </IconButton>
                  <Popover
                    open={isPopoverOpen}
                    sx={{
                      pointerEvents: "none",
                    }}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    disableRestoreFocus
                  >
                    <Typography>
                      Agrega las industrias con las cuales estás familiarizada/o
                      separadas por coma
                    </Typography>
                  </Popover>
                </Stack>
              </Grid>
              <Grid item md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="conditionsAccepted"
                      color="primary"
                      onChange={formik.handleChange}
                      checked={formik.values.conditionsAccepted}
                      required
                    />
                  }
                  label={
                    <span style={{ fontSize: "15px" }}>
                      He leído y acepto las políticas de privacidad.
                    </span>
                  }
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
                  disabled={!formik.values.conditionsAccepted}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
      <LoginDialog
        openDialog={showLoginDialog}
        onDialogOpenChange={handleOpenLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </ThemeProvider>
  );
}
