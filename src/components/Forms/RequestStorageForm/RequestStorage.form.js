import * as Yup from "yup";

export function initialValues() {
  return {
    storagePhoneNumber: "",
    storageAddress: "",
  };
}

export function validationSchema(departments, cities, userCompanies) {
  return Yup.object({
    userCompanyId: Yup.string()
    .required("Debe seleccionar una empresa"),
    storageAddress: Yup.string().required("La dirección es obligatoria."),
    storagePhoneNumber: Yup.string().required("El teléfono es obligatorio."),
    departmentId: Yup.string().required("Debe seleccionar un departamento."),
    cityId: Yup.string()
      .required("Debe seleccionar un barrio"),
  });
}
