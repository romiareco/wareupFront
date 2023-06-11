import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useClient from 'app/hooks/useClient';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

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

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
  .min(6, 'Contraseña debe tener al menos 6 caracteres')
  .required('La contraseña es requerida!'),
  email: Yup.string().email('Direccion de email no valida').required('El email es requerido!'),
});

const SignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { signIn } = useClient();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

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
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Contraseña"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Recuerdame</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/clients/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Olvidaste tu contraseña?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
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
                        to="/clients/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      > 
                        Registrarse
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </SignInRoot>
  );
};

export default SignIn;
