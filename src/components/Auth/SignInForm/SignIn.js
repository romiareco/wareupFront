import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from '../../Typography';
import {useAuth} from '../../../hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import {validationSchema, inititalValues} from "./SignIn.form";
import { Auth } from "../../../api";

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const SignInRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

const authController = new Auth();


export function SignIn() {
  const { login } = useAuth();


  const formik = useFormik({
    initialValues: inititalValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);

       authController.setAccessToken(response.access);
       authController.setRefreshToken(response.refresh);

        login(response.access);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <SignInRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
                  <form onSubmit={formik.handleSubmit}>
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
                        Olvidaste tu contraseña?
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
                      onClick={() => navigate(-1)}
                      sx={{ my: 2, ml: 1 }}
                    >
                      Cancelar
                    </LoadingButton>

                    <Paragraph>
                      No tienes una cuenta?
                      <NavLink
                        to="/users/signup"
                        style={{ color: "green", marginLeft: 5 }}
                      > 
                        Registrarse
                      </NavLink>
                    </Paragraph>
                  </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </SignInRoot>
  );
}
