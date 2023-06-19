import * as Yup from "yup";

export function inititalValues() {
  return {
    email: "",
    password: "",
    remember: true
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    password: Yup.string().min(6, 'Contraseña debe tener al menos 6 caracteres').required("Campo obligatorio"),
  });
}