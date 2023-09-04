import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Company, Common } from "../../../../api";
import { ThemeProvider } from "@mui/material/styles";
import {
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Divider,
} from "@mui/material";
import { useAuth } from "../../../../hooks";
import theme from "../../../../theme/theme";
import { useFormik } from "formik";
import { validationSchema } from "../../Forms/BasicDepositData.form";
import { currencies } from "../../../../utils/enums";
import { isFormComplete } from "./BasicDepositData.utils";

const companyController = new Company();
const commonController = new Common();

export function BasicDepositData({ formInformation, initialValues }) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formInformation(values);
    },
  });

  const [formData, setFormData] = React.useState({
    companyId: "",
    street: "",
    postalCode: 0,
    totalM3: 0,
    departmentId: "",
    cityId: "",
    expectedPrice: 0,
    description: "",
    currency: "",
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    formik.setFieldValue(fieldName, value);
  };

  React.useEffect(() => {
    if (isFormComplete(formData)) {
      formInformation(formData);
    }
  }, [formData, formInformation]);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const { accessToken } = useAuth();

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
        const companiesResponse = await companyController.getAllActiveCompanies(
          accessToken
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
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <form>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
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
                  handleFieldChange("companyId", e.target.value);
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
                    {companies.length === 0 && "No hay compañías registradas"}
                  </MenuItem>
                )}
              </Select>
              {formik.touched.companyId && formik.errors.companyId && (
                <FormHelperText>{formik.errors.companyId}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider> Datos geográficos </Divider>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              type="text"
              name="street"
              label="Dirección"
              value={formik.values.street}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("street", e.target.value);
              }}
              onBlur={formik.handleBlur}
              variant="outlined"
              required
              error={formik.errors.street}
              helperText={formik.errors.street}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="postalCode"
              label="Código postal"
              value={formik.values.postalCode}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("postalCode", parseInt(e.target.value));
              }}
              onBlur={formik.handleBlur}
              variant="outlined"
              error={formik.errors.postalCode}
              helperText={formik.errors.postalCode}
            />
          </Grid>
          <Grid item xs={6}>
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
                  handleFieldChange("departmentId", event.target.value);
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
          <Grid item xs={6}>
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
                  handleFieldChange("cityId", event.target.value);
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
          <Grid item xs={12}>
            <Divider textAlign="middle" />
          </Grid>
          <Grid item xs={1} >
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
                  handleFieldChange("currency", e.target.value);
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
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="number"
              name="expectedPrice"
              label="Precio"
              value={formik.values.expectedPrice}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("expectedPrice", parseInt(e.target.value));
              }}
              onBlur={formik.handleBlur}
              variant="outlined"
              required
              error={formik.errors.expectedPrice}
              helperText={formik.errors.expectedPrice}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="number"
              name="totalM3"
              label="Total metros cúbicos"
              value={formik.values.totalM3}
              onChange={(e) => {
                formik.handleChange(e);
                
                handleFieldChange("totalM3", parseInt(e.target.value));
              }}
              onBlur={formik.handleBlur}
              variant="outlined"
              required
              error={formik.errors.totalM3}
              helperText={formik.errors.totalM3}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider textAlign="middle" />
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
              value={formik.values.description}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("description", e.target.value);
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
      </form>
    </ThemeProvider>
  );
}
