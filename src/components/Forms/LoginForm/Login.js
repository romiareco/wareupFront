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
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));
const authController = new Auth();

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: inititalValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        const response = await authController.login(formValue);

        authController.setAccessToken(response.tokens.access);
        authController.setRefreshToken(response.tokens.refresh);

        login(response.tokens.access);
        navigate("/home");
      } catch (exception) {
        console.error(exception.msg);
        setError(exception.msg, error);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Ajusta el color y la opacidad del fondo desenfocado según tus necesidades
        },
      }}
    >
      <DialogTitle>Iniciar sesión</DialogTitle>
      <DialogContent>
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

          <NavLink to="/users/forgot-password" style={{ color: "green" }}>
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
        <p className="register-form__error">{error}</p>
      </DialogContent>
    </Dialog>
  );
}
