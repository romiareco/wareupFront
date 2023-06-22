import { Box, Card, Grid, styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import {User} from "../../../api/user";
import {useFormik} from "formik";
import {validationSchema, inititalValues} from "./ForgotPassword.form";

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const userController = new User();

export function ForgotPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: inititalValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.recoverPassword(formValue); 
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  value={formik.values.email}
                  variant="outlined"
                  onChange={formik.handleChange}
                  sx={{ mb: 3, width: '100%' }}
                  error={formik.errors.email}
                />

                <LoadingButton fullWidth variant="contained" color="primary" type="submit">
                  Recuperar contraseña
                </LoadingButton>

                <LoadingButton
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ mt: 2 }}
                >
                  Regresar
                </LoadingButton>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
}