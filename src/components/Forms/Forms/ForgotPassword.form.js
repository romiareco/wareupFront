import * as Yup from "yup";

export function inititalValues() {
  return {
    email: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
  });
}
