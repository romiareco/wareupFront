import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import { User, Common, RequestDeposit } from "../../../api";
import { initialValues, validationSchema } from "../Forms/RequestDeposit.form";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Paper, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import { Select, MenuItem } from "@mui/material";
import { RegisterCompanyButton } from "../../Button";
import { useAuth } from "../../../hooks";
import theme from "../../../theme/theme"; // Importa el theme.js aquí
import { NotificationSnackbar } from "../../NotificationSnackbar";

const userController = new User();
const requestDepositController = new RequestDeposit();
const commonController = new Common();

export function RegisterRequestDeposit() {
  const { accessToken, user } = useAuth();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [userCompanies, setUserCompanies] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const handleDepartmentChange = (event) => {
    const selectedDepartmentId = event.target.value;
    const department = departments.find(
      (dep) => dep.value === selectedDepartmentId
    );

    if (department) {
      const transformedCities = department.cities.map((city) => ({
        value: city.id,
        label: city.title,
      }));
      setCities(transformedCities || []);
    }
  };

  const handleCancelClick = () => {
    formik.resetForm();
  };

  useEffect(() => {
    (async () => {
      try {
        const commonResponse = await commonController.getDepartments(
          accessToken
        );
        const transformedDepartments = commonResponse.departments.map(
          (department) => ({
            value: department.id,
            label: department.title,
            cities: department.cities,
          })
        );
        setDepartments(transformedDepartments);

        const userCompaniesResponse =
          await userController.getUserCompanies(accessToken, user.id);

        const companiesData = userCompaniesResponse.companies || [];
        const transformedCompanies = companiesData.map((company) => ({
          value: company.id,
          label: company.businessName,
        }));
        setUserCompanies(transformedCompanies);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, user.id]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        await requestDepositController.requestDepositPublication(
          accessToken,
          formValue,
          user
        );

        setNotificationMessage("Empresa registrada exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        resetForm();
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            padding: "16px",
            width: "100%",
          }}
        >
          <Paper
            sx={{
              padding: "16px",
              width: "100%",
              mb: 4,
              backgroundColor: blue[100],
            }}
          >
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              Te ofrecemos oportunidades flexibles para ocupar tu espacio de
              forma temporal y adecuada a tus necesidades
            </Typography>
          </Paper>
          <Typography component="h1" variant="h5">
            Solicitud para crear nueva publicación de espacio{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <FormControl
                  fullWidth
                  error={formik.touched.companyId && formik.errors.companyId}
                >
                  <InputLabel>Empresa</InputLabel>
                  <Select
                    label="Empresa"
                    value={formik.values.companyId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Agregar esta línea
                    name="companyId"
                  >
                    {userCompanies.length > 0 ? (
                      userCompanies.map((company) => (
                        <MenuItem key={company.value} value={company.value}>
                          {company.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        {userCompanies.length === 0 &&
                          "No hay compañías registradas"}
                      </MenuItem>
                    )}
                  </Select>
                  {formik.touched.companyId && formik.errors.companyId && (
                    <FormHelperText>{formik.errors.companyId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <RegisterCompanyButton />
              </Grid>
            </Grid>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ marginTop: "16px", marginBottom: "16px" }}
            >
              Datos del depósito
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  type="text"
                  name="storageAddress"
                  label="Dirección"
                  variant="outlined"
                  required
                  value={formik.values.storageAddress}
                  onChange={formik.handleChange}
                  error={formik.errors.storageAddress}
                  helperText={formik.errors.storageAddress}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  name="storagePhoneNumber"
                  label="Teléfono"
                  variant="outlined"
                  value={formik.values.storagePhoneNumber}
                  onChange={formik.handleChange}
                  error={formik.errors.storagePhoneNumber}
                  helperText={formik.errors.storagePhoneNumber}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.departmentId && formik.errors.departmentId
                  }
                >
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    value={formik.values.departmentId}
                    label="Departamento"
                    onChange={(event) => {
                      formik.handleChange(event);
                      handleDepartmentChange(event);
                    }}
                    onBlur={formik.handleBlur} // Agregar esta línea
                    name="departmentId"
                  >
                    {departments.length > 0 ? (
                      departments.map((department) => (
                        <MenuItem
                          key={department.value}
                          value={department.value}
                        >
                          {department.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        {departments.length === 0 &&
                          "No hay departamentos registrados"}
                      </MenuItem>
                    )}
                  </Select>
                  {formik.touched.departmentId &&
                    formik.errors.departmentId && (
                      <FormHelperText>
                        {formik.errors.departmentId}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={formik.touched.cityId && formik.errors.cityId}
                >
                  <InputLabel>Barrio</InputLabel>
                  <Select
                    value={formik.values.cityId}
                    label="Barrio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Agregar esta línea
                    name="cityId"
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.value} value={city.value}>
                        {city.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.cityId && formik.errors.cityId && (
                    <FormHelperText>{formik.errors.cityId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    sx={{ marginTop: "16px", marginBottom: "16px" }}
                  >
                    Cuéntanos un poco sobre tu solicitud
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="title"
                  label="Título"
                  variant="outlined"
                  required
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.errors.title}
                  helperText={formik.errors.title}
                  onBlur={formik.handleBlur} // Agregar esta línea
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                  name="description"
                  label="Descripción"
                  variant="outlined"
                  onBlur={formik.handleBlur} // Agregar esta línea
                  required
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.errors.description}
                  helperText={formik.errors.description}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "8px",
                      fontSize: "16px",
                      resize: "vertical",
                      fontFamily: "inherit",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ marginTop: "16px" }}
            >
              <Grid item>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  variant="contained"
                >
                  Registrar
                </LoadingButton>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  variant="outlined"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
