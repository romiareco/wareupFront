import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Company, Common } from "../../../../api";
import { ThemeProvider } from "@mui/material/styles";
import { MenuItem, FormControl, Select, FormHelperText } from "@mui/material";
import { useAuth } from "../../../../hooks";
import theme from "../../../../theme/theme";
import * as Yup from "yup";
import { useFormik } from "formik";

const companyController = new Company();
const commonController = new Common();

export function BasicDepositData({ formInformation, initialValues }) {
  const validationSchema = Yup.object({
    companyId: Yup.number().required("Empresa es requerida"),
    // Agrega las validaciones para los otros campos
    expectedPrice: Yup.number().required("Precio es requerido"),
    description: Yup.string().required("Descripción es requerida"),
    cityId: Yup.number().required("Ciudad es requerida"),
    departmentId: Yup.number().required("Departamento es requerido"),
    // Agrega las validaciones para los otros campos
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formInformation(values);
    },
  });

  const [formData, setFormData] = React.useState({
    // Inicializa los campos relevantes del formulario
    companyId: "",
    street: "",
    postalCode: "",
    totalM3: "",
    departmentId: "",
    cityId: "",
    expectedPrice: "",
    description: "",
    // ... otros campos ...
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    formik.setFieldValue(fieldName, value);
  };

  React.useEffect(() => {
    const isFormComplete = () => {
      // Verifica si todos los campos requeridos están completos
      // por ejemplo: return formData.companyId !== "" && formData.street !== "" && ...
      return (
        formData.hasOwnProperty("companyId") &&
        formData.companyId !== "" &&
        formData.hasOwnProperty("expectedPrice") &&
        formData.expectedPrice !== "" &&
        formData.hasOwnProperty("description") &&
        formData.description !== "" &&
        formData.hasOwnProperty("cityId") &&
        formData.cityId !== "" &&
        formData.hasOwnProperty("departmentId") &&
        formData.departmentId !== ""
      );
    };

    if (isFormComplete()) {
      formInformation(formData);
    }
  }, [formData, formInformation]);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const { accessToken, user } = useAuth();

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

        const companiesResponse = await companyController.getAllCompanies(
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
  }, [accessToken, user.id]);

  return (
    <ThemeProvider theme={theme}>
      <form>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <FormControl fullWidth>
              <InputLabel>Empresa</InputLabel>
              <Select
                name="companyId"
                value={formik.values.companyId}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleFieldChange("companyId", e.target.value);
                }}
                onBlur={formik.handleBlur}
              >
                {companies.map((company) => (
                  <MenuItem key={company.value} value={company.value}>
                    {company.label}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.companyId && formik.errors.companyId && (
                <FormHelperText>{formik.errors.companyId}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Departamento</InputLabel>
            <Select
              name="departmentId"
              value={formik.values.departmentId}
              onChange={(event) => {
                formik.handleChange(event);
                handleFieldChange("departmentId", event.target.value);
                handleDepartmentChange(event);
              }}
              onBlur={formik.handleBlur}
            >
              {departments.map((department) => (
                <MenuItem key={department.value} value={department.value}>
                  {department.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.departmentId && formik.errors.departmentId && (
              <FormHelperText>{formik.errors.departmentId}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Barrio/Ciudad</InputLabel>
            <Select
              name="cityId"
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
          <TextField
            fullWidth
            type="text"
            name="expectedPrice"
            label="Precio"
            value={formik.values.expectedPrice}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("expectedPrice", e.target.value);
            }}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
            error={formik.errors.expectedPrice}
            helperText={formik.errors.expectedPrice}
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
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: "16px" }}
        ></Grid>
      </form>
    </ThemeProvider>
  );
}
