import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks";
import { User } from "../../../api/user";
import React, { Fragment, useState } from "react";
import { NotificationSnackbar } from "../../Snackbar";
import { initialValues } from "../../Forms/Forms/User.form";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { LoadingButton } from "@mui/lab";
import { Form } from "semantic-ui-react";

const CardContainer = styled(Card)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    industry: Yup.string().required("Este campo es obligatorio."),
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
  });
}

const userController = new User();

export function UserInformationProfile({ user }) {
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        formValue.id = user.id;
        await userController.updateUser(accessToken, formValue);

        setNotificationMessage("Usuario actualizado exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        setLoading(false);
        setIsEditing(false);
      } catch (error) {
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    formik.resetForm();
  };

  return (
    <CardContainer>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ marginTop: "8px", marginBottom: "16px" }}
        >
          Datos personales
        </Typography>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="name"
                fullWidth
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                disabled={!isEditing}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Apellido"
                name="lastName"
                fullWidth
                value={formik.values.lastName}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
                disabled={!isEditing}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={formik.values.email}
                disabled
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Industrias con las que estoy familiarizada/o"
                name="industry"
                fullWidth
                value={formik.values.industry}
                error={formik.touched.industry && formik.errors.industry}
                helperText={formik.touched.industry && formik.errors.industry}
                disabled={!isEditing}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>

          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            {!isEditing ? (
              <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<EditRoundedIcon />}
              >
                Editar perfil
              </Button>
            ) : (
              <Fragment>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={formik.isSubmitting}
                >
                  Guardar
                </LoadingButton>
                <Button variant="contained" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Fragment>
            )}
          </Box>
        </Form>
      </CardContent>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </CardContainer>
  );
}
