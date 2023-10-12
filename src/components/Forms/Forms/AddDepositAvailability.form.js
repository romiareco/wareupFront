import * as Yup from "yup";
import dayjs from "dayjs";

export function validationSchema(deposit) {
  return Yup.object({
    totalM3: Yup.number()
      .required("Debe cargar sus metros cúbicos")
      .max(
        deposit.totalM3,
        `Total M³ no puede ser superior a ${deposit.totalM3}`
      )
      .min(1, "Debe ser mayor a 0"),
    startDate: Yup.date().required("Fecha de inicio es requerida"),
    endDate: Yup.date()
      .required("Fecha de fin es requerida")
      .when("startDate", (startDate, schema) => {
        return (
          startDate &&
          schema.min(
            startDate,
            "La fecha de fin debe ser posterior o igual a la fecha de inicio"
          )
        );
      }),
  });
}

export function initialValues(deposit = {}) {
  return {
    startDate: dayjs(),
    endDate: dayjs(),
    totalM3: deposit.totalM3 || "",
  };
}
