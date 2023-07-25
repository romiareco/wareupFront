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

  const [selectedUserCompany, setSelectedUserCompany] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState({});

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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

        const userCompaniesData = userCompaniesResponse.companies;

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
                  <Select
                    value={selectedUserCompany}
                    onChange={(event) =>
                      setSelectedUserCompany(event.target.value)
                    }
                  >
                    {userCompanies.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))}
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
              <Grid item xs={12}>
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
              <Grid item xs={12} sm={6}>
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
                    value={age}
                    label="Departamento"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
