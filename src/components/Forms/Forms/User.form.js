import * as Yup from "yup";

export function initialValues(user = {}) {
  return {
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    password: user.password || "",
    repeatPassword: user.repeatPassword || "",
    industry: user.industry || "",
    conditionsAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    industry: Yup.string().required("Este campo es obligatorio."),
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Campo obligatorio"),
    repeatPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
  });
}
