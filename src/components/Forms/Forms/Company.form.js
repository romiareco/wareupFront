import * as Yup from "yup";

export function initialValues(company = {}) {
  return {
    businessName: company.businessName || "",
    RUT: company.RUT || "",
    contactName: company.contactName || "",
    position : company.position || "",
    email: company.email || "",
    address: company.address || "",
    phone : company.phone || ""
  };
}

export function validationSchema(company = {}) {
  return Yup.object({
    contactName: Yup.string().required("Campo obligatorio"),
    position: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("Campo obligatorio"),
    RUT: Yup.string()
      .matches(/^[0-9]+$/, "RUT solo puede contener números")
      .required("Campo obligatorio"),
    businessName: Yup.string().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    phone: Yup.string()
      .matches(
        /^[0-9()+-]*$/,
        "El número de teléfono contiene caracteres no válidos"
      )
      .required("Campo obligatorio"),
  });
}
