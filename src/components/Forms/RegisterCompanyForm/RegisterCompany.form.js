import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    position: "",
    rut: "",
    email: "",
    businessName: "",
    address: "",
    phoneNumber: ""
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es válido"),
    rut:  Yup.string()
    .matches(/^[0-9]+$/, "RUT solo puede contener números"),
    phoneNumber: Yup.string()
    .matches(/^[0-9()+-]*$/, "El número de teléfono contiene caracteres no válidos")
  }).required();
}
