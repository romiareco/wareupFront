import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from '../../Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {User} from "../../../api/user";
import {OKAlert} from "../../Alerts";
import {initialValues, validationSchema} from "./Register.form";
import { Form } from "semantic-ui-react";

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

const userController = new User();

export function Register(props) {
  const { openLogin } = props;
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await userController.register(formValue);
        openLogin();
        navigate('/users/login');

      } catch (error) {
        setError("Error en el servidor", error);
      }
    },
  });

  return (
    <RegisterRoot>
        <Card className="card">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
              </JustifyBox>
            </Grid>
            <Grid item sm={6} xs={12}>
            <ContentBox>
              <Form className="register-form" onSubmit={formik.handleSubmit}>
              <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="name"
                      label="Nombre"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.errors.name}
                      sx={{ mb: 3 }}
                    />
           <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="last_name"
                      label="Apellido"
                      variant="outlined"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      error={formik.errors.last_name}
                      sx={{ mb: 3 }}
                    />
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
                     <TextField
                      fullWidth
                      size="small"
                      name="repeatPassword"
                      type="password"
                      label="Repetir contraseña"
                      variant="outlined"
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      error={formik.errors.repeatPassword}
                      helperText={formik.errors.repeatPassword}
                      sx={{ mb: 1.5 }}
                    />
                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="conditionsAccepted"
                          onChange={formik.handleChange}
                          checked={formik.values.conditionsAccepted}
                          error={formik.errors.conditionsAccepted}
                          helperText={formik.errors.conditionsAccepted}

                          sx={{ padding: 0 }}
                        />

                        <Paragraph>He leído y acepto las poíticas de privacidad</Paragraph>
                      </FlexBox>
                    </FlexBox>
           
            <LoadingButton
                      type="submit"
                      color="primary"
                      loading={formik.isSubmitting}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Crear cuenta
                    </LoadingButton>
                    <LoadingButton
                      color="primary"
                      variant="outlined"
                      onClick={() => navigate("/")}
                      sx={{ my: 2, ml: 1 }}
                    >
                      Cancelar
                    </LoadingButton>
            <p className="register-form__error">{error}</p>
              </Form>
            </ContentBox>
             
            </Grid>
           
          </Grid> 
        </Card>
        
    </RegisterRoot>
    
  );
}