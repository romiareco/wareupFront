import * as Yup from "yup";
import { ENV } from "../../../utils";

export function editValues(deposit = {}) {
  return {
    companyId: deposit.companyId || "",
    expectedPrice: deposit.expectedPrice || "",
    description: deposit.description || "",
    cityId: deposit.cityId || "",
    departmentId: deposit.departmentId || "",
    totalM3: deposit.totalM3 || "",
    currency: deposit.currency || "",
    address: deposit.address || "",
    postalCode: deposit.postalCode || "",
    minimumBusinessVolume: deposit.minimumBusinessVolume || "",
    minimumBusinessPeriod: deposit.minimumBusinessPeriod || "",
  };
}

export function validationSchema() {
  return Yup.object({
    companyId: Yup.number().required("Debe seleccionar una empresa"),
    expectedPrice: Yup.number().required("Debe cargar el precio"),
    description: Yup.string()
      .required("Debe cargar una descripción para la publicación del depósito")
      .max(
        ENV.DEPOSITS_PARAMETERS_LIMIT.MAX_DESCRIPTION_CHARACTERS,
        "La descripción no debe superar los 200 caracteres"
      ),
    cityId: Yup.number().required("Barrio/Ciudad es requerida"),
    departmentId: Yup.number().required("Departamento es requerido"),
    totalM3: Yup.number().required("Debe cargar sus metros cúbicos"),
    currency: Yup.string().required("Debe seleccionar una moneda"),
    address: Yup.string().required(
      "Debe completarse la dirección del depósito"
    ),
    minimumBusinessVolume: Yup.number()
      .typeError("Debe ser un número mayor que 0")
      .required("Debe cargar el volumen mínimo de arrendamiento"),
    minimumBusinessPeriod: Yup.number()
      .typeError("Debe ser un número mayor que 0")
      .required("Debe cargar el período mínimo de arrendamiento"),
  });
}
