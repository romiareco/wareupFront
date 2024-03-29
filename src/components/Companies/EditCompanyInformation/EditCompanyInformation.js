import { Grid, Box, Button, TextField, ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { Company } from "../../../api";
import React, { useState } from "react";
import { NotificationSnackbar } from "../../Snackbar";
import {
  initialValues,
  validationSchema,
} from "../../Forms/Forms/Company.form";
import { LoadingButton } from "@mui/lab";
import theme from "../../../theme/theme";

const companyController = new Company();

export function EditCompanyInformation({ company }) {
  const { accessToken } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(company),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        formValue.id = company.id;
        formValue.status = company.status;
        await companyController.update(accessToken, formValue);

        setNotificationMessage("Empresa actualizada exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        setLoading(false);
      } catch (error) {
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
        setLoading(false);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item md>
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
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item md>
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
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item md={12}>
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
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item md={12}>
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
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item md={12}>
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
            helperText={
              formik.touched.businessName && formik.errors.businessName
            }
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item md={12}>
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
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            fullWidth
            name="phone"
            type="tel"
            label="Celular/Teléfono"
            variant="outlined"
            required
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={formik.handleSubmit}
        >
          Guardar
        </LoadingButton>
        <Button variant="contained" onClick={handleCancel}>
          Cancelar
        </Button>
      </Box>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
