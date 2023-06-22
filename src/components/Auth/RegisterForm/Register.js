import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from '../../Typography';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {User} from "../../../api/user";
import {OKAlert} from "../../Alerts";

//TODO: Arreglar checkbox de acepto condiciones, quedo fijo en true
//TODO: ver de agregar doble validación de password, (campo repetir contraseña)
const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const RegisterRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital form values
const initialValues = {
  email: '',
  password: '',
  name: '',
  last_name: '',
  conditionsAccepted: true,
};

//TODO: ver si lo podemos pasar para otro archivo
// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida!'),
  email: Yup.string().email('Direccion de email no valida').required('El email es requerido!')
});

const userController = new User();

export function Register() {
  const theme = useTheme();
  const { register } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      register(values.email, values.name, values.last_name, values.password);
      navigate('/');
      setLoading(false);
      OKAlert();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <RegisterRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
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
                      type="text"
                      name="name"
                      label="Nombre"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                      error={Boolean(errors.name && touched.name)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="last_name"
                      label="Apellido"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.last_name}
                      onChange={handleChange}
                      helperText={touched.last_name && errors.last_name}
                      error={Boolean(errors.last_name && touched.last_name)}
                      sx={{ mb: 3 }}
                    />
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
                      sx={{ mb: 2 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="Acepto condiciones"
                        onChange={handleChange}
                        checked={values.conditionsAccepted}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        He leido y acepto los terminos y condiciones.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Registrar
                    </LoadingButton>

                    <LoadingButton
                      color="primary"
                      variant="outlined"
                      onClick={() => navigate(-1)}
                      sx={{ mb: 2, mt: 3, ml: 1 }}
                    >
                      Cancelar
                    </LoadingButton>

                    <Paragraph>
                      Ya tienes una cuenta?
                      <NavLink
                        to="/users/login"
                        style={{ color: "green", marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </RegisterRoot>
  );
}