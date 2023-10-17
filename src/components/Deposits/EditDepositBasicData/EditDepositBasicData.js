import {
  Grid,
  Box,
  Button,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { Common, Deposit, User } from "../../../api";
import React, { useState, useEffect } from "react";
import { NotificationSnackbar } from "../../Snackbar";
import {
  editValues,
  validationSchema,
} from "../../Forms/Forms/BasicDepositData.form";
import { currencies } from "../../../utils/enums";
import { LoadingButton } from "@mui/lab";
import theme from "../../../theme/theme";

const depositController = new Deposit();
const commonController = new Common();
const userController = new User();

export function EditDepositBasicData({ deposit }) {
  const { accessToken, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

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

  useEffect(() => {
    (async () => {
      try {
        const companiesResponse = await userController.getUserActiveCompanies(
          accessToken,
          user.id
        );
        const companiesData = companiesResponse.companies || [];
        const transformedCompanies = companiesData.map((company) => ({
          value: company.id,
          label: company.businessName,
        }));
        setCompanies(transformedCompanies);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, user.id]);

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

        if (transformedDepartments) {
          const depositCurrentDepId = deposit.departmentId;
          const currentDepartment = transformedDepartments.find(
            (dep) => dep.value === depositCurrentDepId
          );

          const transformedCities = currentDepartment.cities.map((city) => ({
            value: city.id,
            label: city.title,
          }));
          setCities(transformedCities || []);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user.id, deposit.departmentId]);

  const formik = useFormik({
    initialValues: editValues(deposit),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        formValue.id = deposit.id;
        formValue.status = deposit.status;
        await depositController.updateDeposit(accessToken, formValue);

        setNotificationMessage("Depósito actualizado exitosamente");
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
      <Grid container spacing={3} alignItems="center">
        <Grid item md>
          <FormControl
            fullWidth
            error={formik.touched.companyId && formik.errors.companyId}
          >
            <InputLabel>Empresa</InputLabel>
            <Select
              name="companyId"
              label="Empresa"
              value={formik.values.companyId}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            >
              {companies.length > 0 ? (
                companies.map((company) => (
                  <MenuItem key={company.value} value={company.value}>
                    {company.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value="">
                  {companies.length === 0 && "No hay empresas registradas"}
                </MenuItem>
              )}
            </Select>
            {formik.touched.companyId && formik.errors.companyId && (
              <FormHelperText>{formik.errors.companyId}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <Divider> Datos geográficos </Divider>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            type="text"
            name="address"
            label="Dirección"
            value={formik.values.address}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
            error={formik.errors.address}
            helperText={formik.errors.address}
          />
        </Grid>
        <Grid item md>
          <TextField
            fullWidth
            type="number"
            name="postalCode"
            label="Código postal"
            value={formik.values.postalCode}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            error={formik.errors.postalCode}
            helperText={formik.errors.postalCode}
          />
        </Grid>
        <Grid item md={6}>
          <FormControl
            fullWidth
            error={formik.touched.departmentId && formik.errors.departmentId}
          >
            <InputLabel>Departamento</InputLabel>
            <Select
              name="departmentId"
              label="Departamento"
              value={formik.values.departmentId}
              onChange={(event) => {
                formik.handleChange(event);
                handleDepartmentChange(event);
              }}
              onBlur={formik.handleBlur}
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
              name="cityId"
              label="Barrio/Ciudad"
              value={formik.values.cityId}
              onChange={(event) => {
                formik.handleChange(event);
              }}
              onBlur={formik.handleBlur}
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
          <Divider>Datos de la publicación</Divider>
        </Grid>

        <Grid item md={4}>
          <FormControl
            fullWidth
            error={formik.touched.currency && formik.errors.currency}
          >
            <InputLabel>Moneda</InputLabel>
            <Select
              name="currency"
              label="Moneda"
              value={formik.values.currency}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.value} value={currency.value}>
                  {currency.value}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.currency && formik.errors.currency && (
              <FormHelperText>{formik.errors.currency}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            type="number"
            name="expectedPrice"
            label="Precio"
            value={formik.values.expectedPrice}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
            error={formik.errors.expectedPrice}
            helperText={formik.errors.expectedPrice}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            type="number"
            name="totalM3"
            label="Total metros cúbicos"
            value={formik.values.totalM3}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
            error={formik.errors.totalM3}
            helperText={formik.errors.totalM3}
          />
        </Grid>
        <Grid item md>
          <TextField
            fullWidth
            type="number"
            name="minimumBusinessPeriod"
            label="Período mínimo de arrendamiento"
            value={formik.values.minimumBusinessPeriod}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
            error={formik.errors.minimumBusinessPeriod}
            helperText={formik.errors.minimumBusinessPeriod}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">días</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md>
          <TextField
            fullWidth
            type="number"
            name="minimumBusinessVolume"
            label="Volumen mínimo de arrendamiento"
            value={formik.values.minimumBusinessVolume}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
            error={formik.errors.minimumBusinessVolume}
            helperText={formik.errors.minimumBusinessVolume}
            InputProps={{
              endAdornment: <InputAdornment position="end">m³</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item md={12}>
          <Divider textAlign="middle" />
        </Grid>
        <Grid item md>
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={10}
            name="description"
            label="Descripción"
            variant="outlined"
            value={formik.values.description}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            required
            onBlur={formik.handleBlur}
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

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <LoadingButton
          variant="contained"
          onClick={formik.handleSubmit}
          size={"medium"}
          loading={loading}
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
