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
    storageAddress: Yup.string().required("La dirección es obligatoria."),
    storagePhoneNumber: Yup.string().required("El teléfono es obligatorio."),
    title: Yup.string().required(
      "Debe cargar un título para la solicitud de depósito."
    ),
    description: Yup.string().required(
      "Debe cargar una breve descripción de su solicitud."
    ),
  });
}
