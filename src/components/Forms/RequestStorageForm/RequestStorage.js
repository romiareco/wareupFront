import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { User, Storage } from "../../../api";
import { initialValues, validationSchema } from "./RequestStorage.form";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Paper, InputLabel, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import { Select, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { RegisterCompany } from "../../Buttons";
import { useAuth } from "../../../hooks";
import theme from "./../../../theme/theme"; // Importa el theme.js aquí

const userController = new User();
const storageController = new Storage();

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

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

export function RequestStorage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const barrios = [{ value: "Malvin" }, { value: "Barrio Sur" }];

  const { accessToken } = useAuth();

  const [company, setCompany] = React.useState([]);

  const handleCompanyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCompany(typeof value === "string" ? value.split(",") : value);
  };

  const [barrio, setBarrio] = React.useState(barrios[0].value);

  const handleBarrioChange = (event) => {
    setBarrio(event.target.value);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await storageController.requestStoragePublication(accessToken, formValue);
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
                <FormControl sx={{ m: 1, width: "100%", mt: 3 }}>
                  <Select
                    name="company"
                    multiple={false}
                    displayEmpty
                    value={company}
                    onChange={handleCompanyChange}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Seleccione una empresa</em>;
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={theme.menuItemGetStyles(name, company)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <RegisterCompany />
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
                  <InputLabel>Barrio</InputLabel>
                  <Select
                    value={barrio}
                    label="Barrio"
                    onChange={handleBarrioChange}
                  >
                    {barrios.map((item) => (
                      <MenuItem value={item.value}>{item.value}</MenuItem>
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
