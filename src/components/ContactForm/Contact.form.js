import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    email: "",
    message: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    message: Yup.string()
      .max(250, "El mensaje no puede superar los 250 caracteres")
      .required("Campo obligatorio"),
  });
}
