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
  import { useAuth } from "../../../hooks";
  import { Company } from "../../../api";
  import React, { useState } from "react";
  import { NotificationSnackbar } from "../../NotificationSnackbar";
  import { initialValues, validationSchema } from "../../Forms/Forms/Company.form";

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
  
  const companyController = new Company();
  
  export function EditCompanyInformation({ company }) {
    const { accessToken } = useAuth();
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar la edición
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'
  
    const formik = useFormik({
      initialValues: initialValues(company),
      validationSchema: validationSchema(),
      onSubmit: async (formValue) => {
        try {
          //TODO: pendiente a que esté pronto del lado del backend
          formValue.id = company.id;
          await companyController.update(accessToken, formValue);
  
          setNotificationMessage("Empresa actualizada exitosamente");
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
            Editar empresa
          </Typography>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="contactName"
                  label="Nombre completo"
                  variant="outlined"
                  required
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  error={formik.touched.contactName && formik.errors.contactName}
                  helperText={formik.touched.contactName && formik.errors.contactName}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  name="position"
                  label="Cargo"
                  variant="outlined"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  error={formik.touched.position && formik.errors.position}
                  helperText={formik.touched.position && formik.errors.position}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="RUT"
                  label="RUT"
                  variant="outlined"
                  required
                  value={formik.values.RUT}
                  onChange={formik.handleChange}
                  error={formik.touched.RUT && formik.errors.RUT}
                  helperText={formik.touched.RUT && formik.errors.RUT}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="businessName"
                  type="text"
                  label="Razón social"
                  variant="outlined"
                  required
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  error={formik.touched.businessName && formik.errors.businessName}
                  helperText={formik.touched.businessName && formik.errors.businessName}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  type="text"
                  label="Dirección de facturación"
                  variant="outlined"
                  required
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  type="tel"
                  label="Celular/Teléfono"
                  variant="outlined"
                  required
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  disabled={!isEditing}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
  
          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            {!isEditing ? (
              <Button variant="contained" onClick={handleEdit}>
                Editar empresa
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
  