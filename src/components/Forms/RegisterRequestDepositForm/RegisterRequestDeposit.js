import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import { User, Common, DepositRequest } from "../../../api";
import { initialValues, validationSchema } from "../Forms/RequestDeposit.form";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Paper, FormControl, Divider } from "@mui/material";
import { Select, MenuItem, Box } from "@mui/material";
import { RegisterCompanyButton } from "../../Button";
import { useAuth } from "../../../hooks";
import theme from "../../../theme/theme"; // Importa el theme.js aquí
import { NotificationSnackbar } from "../../NotificationSnackbar";

const userController = new User();
const depositRequestController = new DepositRequest();
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
        const commonResponse = await commonController.getDepartments();
        const transformedDepartments = commonResponse.departments.map(
          (department) => ({
            value: department.id,
            label: department.title,
            cities: department.cities,
          })
        );
        setDepartments(transformedDepartments);

        const userCompaniesResponse =
          await userController.getUserActiveCompanies(accessToken, user.id);

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
        await depositRequestController.requestDepositPublication(
          accessToken,
          formValue,
          user
        );

        setNotificationMessage("Solicitud registrada exitosamente");
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin={3}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#F2F2F2",
          }}
        >
          <Typography variant="body1" sx={theme.typography.montserratFont}>
            Te ofrecemos oportunidades flexibles para ocupar tu espacio de forma
            temporal y adecuada a tus necesidades
          </Typography>
        </Paper>

        <Typography variant="h5" sx={theme.typography.montserratFont}>
          Solicitud para crear nueva publicación de espacio{" "}
        </Typography>
        <Box
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3, width: "90%" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item md={8}>
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
            <Grid item md>
              <RegisterCompanyButton />
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            sx={{
              ...theme.typography.montserratFont,
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            Datos del depósito
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={8}>
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
            <Grid item md={4}>
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
            <Grid item md={6}>
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
                      <MenuItem key={department.value} value={department.value}>
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
                {formik.touched.departmentId && formik.errors.departmentId && (
                  <FormHelperText>{formik.errors.departmentId}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl
                fullWidth
                error={formik.touched.cityId && formik.errors.cityId}
              >
                <InputLabel>Barrio/Ciudad</InputLabel>
                <Select
                  value={formik.values.cityId}
                  label="Barrio/Ciudad"
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
            <Grid item md={12}>
              <Grid container justifyContent="center">
                <Typography
                  variant="h5"
                  sx={{
                    ...theme.typography.montserratFont,
                    marginTop: "16px",
                    marginBottom: "16px",
                  }}
                >
                  Cuéntanos un poco sobre tu solicitud
                </Typography>
              </Grid>
            </Grid>
            <Grid item md>
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
            <Grid item md={12}>
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

          <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
            <LoadingButton
              type="submit"
              color="primary"
              loading={formik.isSubmitting}
              variant="contained"
              size="medium"
            >
              Registrar
            </LoadingButton>

            <LoadingButton
              color="primary"
              variant="outlined"
              onClick={handleCancelClick}
            >
              Cancelar
            </LoadingButton>
          </Box>
        </Box>
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
