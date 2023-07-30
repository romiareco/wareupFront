import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { User, Storage, Common } from "../../../api";
import { initialValues, validationSchema } from "./RequestStorage.form";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Paper, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import { Select, MenuItem } from "@mui/material";
import { RegisterCompanyBttn } from "../../Buttons";
import { useAuth } from "../../../hooks";
import theme from "./../../../theme/theme"; // Importa el theme.js aquí
import OutlinedInput from "@mui/material/OutlinedInput";

const userController = new User();
const storageController = new Storage();
const commonController = new Common();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function RequestStorage() {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [userCompanies, setUserCompanies] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [selectedUserCompany, setSelectedUserCompany] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [selectedCity, setSelectedCity] = useState({});

  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value;
    const department = departments.find((dep) => dep.id === departmentId);

    const cities = department.cities;
    setSelectedDepartment(department);
    setCities(cities);

    console.log("SelectedDepartment: " + JSON.stringify(selectedDepartment));
    console.log("cities: " + JSON.stringify(cities));
  };

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    const city = cities.find((cit) => cit.id === cityId);

    setSelectedCity(city);
    console.log("SelectedCity: " + JSON.stringify(selectedCity));
  };

  const handleUserCompanyChange = (event) => {
    const userCompanyId = event.target.value;
    const userCompany = userCompanies.find(
      (company) => company.id === userCompanyId
    );

    setSelectedUserCompany(userCompany);
  };

  useEffect(() => {
    (async () => {
      try {
        const commonResponse = await commonController.getDepartments(
          accessToken
        );
        const departmentsData = commonResponse.departments;

        if (departmentsData.length > 0) {
          setSelectedDepartment(departmentsData[0].id); // Establecer solo el id del primer elemento
        }
        setDepartments(departmentsData);

        const userCompaniesResponse = await userController.getUserCompanies(
          accessToken,
          user.id
        );

        const userCompaniesData = userCompaniesResponse.companies || [];

        if (userCompaniesData.length > 0) {
          setSelectedUserCompany(userCompaniesData[0]);
        }
        setUserCompanies(userCompaniesData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, user.id]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await storageController.requestStoragePublication(
          accessToken,
          formValue
        );
        //TODO: definir que debe pasar cuando se registra un nuevo espacio. Seguimos en registrar espacios? O redireccionamos a otro lado?
      } catch (error) {
        setError("Error en el servidor", error);
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Empresa
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Empresa"
                    value={selectedUserCompany.id || ""}
                    onChange={handleUserCompanyChange}
                  >
                    {userCompanies.length > 0 ? (
                      userCompanies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                          {company.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        {userCompanies.length === 0 &&
                          "No hay compañías registradas"}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <RegisterCompanyBttn />
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Departamento
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedDepartment.id || ""}
                    label="Departamento"
                    onChange={handleDepartmentChange}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Barrio
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedCity.id || ""}
                    label="Barrio"
                    onChange={handleCityChange}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <p className="register-form__error">{error}</p>
      </Container>
    </ThemeProvider>
  );
}
