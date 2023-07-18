import React from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks";

const CardContainer = styled(Card)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileIcon = styled(EditIcon)`
  vertical-align: middle;
  margin-right: 8px;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().when("$isEditing", {
    is: true,
    then: Yup.string().required("Campo requerido"),
  }),
  lastName: Yup.string().when("$isEditing", {
    is: true,
    then: Yup.string().required("Campo requerido"),
  }),
  email: Yup.string()
    .email("Email inválido")
    .when("$isEditing", {
      is: true,
      then: Yup.string().required("Campo requerido"),
    }),
  password: Yup.string().when("$isEditing", {
    is: true,
    then: Yup.string().required("Campo requerido"),
  }),
});

export function UserInformationProfile() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: user.password || "",
    },
    validationSchema: Yup.lazy((values) =>
      validationSchema.clone().meta({ isEditing: !!values.name })
    ),
    onSubmit: (values) => {
      // Aquí puedes agregar la lógica para guardar los cambios en la base de datos o hacer otras acciones necesarias
      console.log(values);
    },
    validateOnMount: false,
  });

  const handleCancel = () => {
    formik.setSubmitting(false); // Establecer isSubmitting en false
  };

  //TODO: hacer que el titulo esté más alejado del form
  return (
    <CardContainer>
      <CardContent>
        <Typography variant="h5" component="div">
          <ProfileIcon />
          Perfil de Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="name"
              fullWidth
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              disabled={!formik.isSubmitting}
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
              disabled={!formik.isSubmitting}
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
              label="Contraseña"
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              disabled={!formik.isSubmitting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          {!formik.isSubmitting ? (
            <Button variant="contained" onClick={formik.handleSubmit}>
              Editar perfil
            </Button>
          ) : (
            <Button variant="contained" onClick={formik.handleSubmit}>
              Guardar cambios
            </Button>
          )}
          <Button variant="contained" onClick={handleCancel}>
            Cancelar
          </Button>
        </Box>
      </CardContent>
    </CardContainer>
  );
}
