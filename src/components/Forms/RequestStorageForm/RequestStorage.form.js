import * as Yup from "yup";

export function initialValues() {
  return {
    storagePhoneNumber: "",
    storageAddress: "",
  };
}

export function validationSchema() {
  return Yup.object({
    storagePhoneNumber: Yup.string().required("Campo obligatorio"),
    storageAddress: Yup.string().required("Campo obligatorio"),
    company: Yup.string().required("Seleccione una empresa"),
  });
}
