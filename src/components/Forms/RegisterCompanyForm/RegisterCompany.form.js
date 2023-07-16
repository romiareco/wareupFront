import * as Yup from "yup";

export function initialValues() {
  return {
    contactname: "",
    position: "",
    rut: "",
    email: "",
    businessName: "",
    address: "",
    phoneNumber: "",
  };
}

export function validationSchema() {
  return Yup.object({
    contactname: Yup.string().required("Campo obligatorio"),
    position: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("Campo obligatorio"),
    rut: Yup.string()
      .matches(/^[0-9]+$/, "RUT solo puede contener números")
      .required("Campo obligatorio"),
    businessName: Yup.string().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9()+-]*$/,
        "El número de teléfono contiene caracteres no válidos"
      )
      .required("Campo obligatorio"),
  });
}
