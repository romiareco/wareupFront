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
import { User } from "../../../api/user";
import React, { useState } from "react";
import { NotificationSnackbar } from "../../NotificationSnackbar";

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

export function validationSchema() {
  return Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    lastName: Yup.string().required("Campo requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Campo obligatorio"),
  });
}

const userController = new User();

export function UserInformationProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar la edición
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
    },
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        formValue.id = user.id;
        await userController.updateUser(formValue);

        setNotificationMessage(
          "Usuario actualizado exitosamente"
        );
        setNotificationSeverity("success");
        setNotificationOpen(true);

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
        </Grid>

        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          {!isEditing ? (
            <Button variant="contained" onClick={handleEdit}>
              Editar perfil
            </Button>
          ) : (
            <React.Fragment>
              <Button variant="contained" onClick={formik.handleSubmit}>
                Guardar cambios
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                Cancelar
              </Button>
            </React.Fragment>
          )}
        </Box>
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
