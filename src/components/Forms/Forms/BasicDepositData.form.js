import * as Yup from "yup";

export function validationSchema() {
  return Yup.object({
    companyId: Yup.number().required("Debe seleccionar una empresa"),
    expectedPrice: Yup.number().required("Debe cargar el precio"),
    description: Yup.string().required("Debe cargar una descripción para la publicación del depósito"),
    cityId: Yup.number().required("Barrio/Ciudad es requerida"),
    departmentId: Yup.number().required("Departamento es requerido"),
    totalM3: Yup.number().required("Debe cargar sus metros cúbicos"),
    currency: Yup.string().required("Debe seleccionar una moneda"),
    street: Yup.string().required("Debe completarse la dirección del depósito"),
  });
}
