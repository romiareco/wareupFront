import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
    subject: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    subject: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("Campo obligatorio"),
    message: Yup.string()
      .max(250, "El mensaje no puede superar los 250 caracteres")
      .required("Campo obligatorio"),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9()+-]*$/,
        "El número de teléfono contiene caracteres no válidos"
      )
      .required("Campo obligatorio"),
  });
}
