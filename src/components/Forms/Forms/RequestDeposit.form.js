import * as Yup from "yup";

export function initialValues() {
  return {
    storagePhoneNumber: "",
    storageAddress: "",
    userCompanyId: "",
    departmentId: "",
    cityId: "",
    title: "",
    description: "",
  };
}

export function validationSchema(departments, cities, userCompanies) {
  return Yup.object({
    companyId: Yup.number().required("Debe seleccionar una empresa"),
    storageAddress: Yup.string().required("La dirección es obligatoria."),
    storagePhoneNumber: Yup.string()
    .matches(
      /^[0-9()+-]*$/,
      "El número de teléfono contiene caracteres no válidos"
    )
    .required("Campo obligatorio"),
    title: Yup.string().required(
      "Debe cargar un título para la solicitud de depósito."
    ),
    description: Yup.string().required(
      "Debe cargar una breve descripción de su solicitud."
    ),
    cityId: Yup.number().required("Barrio/Ciudad es requerida"),
    departmentId: Yup.number().required("Departamento es requerido"),
  });
}
