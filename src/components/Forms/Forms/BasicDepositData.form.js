import * as Yup from "yup";

export function initialValues() {
  return {
    description: "",
    totalM3: "",
    companyId: "",
    departmentId: "",
    cityId: "",
    expectedPrice: "",
    postalCode: "",
  };
}

export function validationSchema() {
  return Yup.object({
    description: Yup.string().required("La dirección es obligatoria."),
    totalM3: Yup.string().required(
      "Debe cargar un título para la solicitud de depósito."
    ),
    expectedPrice: Yup.string().required(
      "Debe cargar una breve descripción de su solicitud."
    ),
  });
}
