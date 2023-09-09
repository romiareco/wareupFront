import * as Yup from "yup";
import dayjs from "dayjs";

export function validationSchema() {
    return Yup.object({
      totalM3: Yup.number().required("Debe cargar sus metros cúbicos"),
      startDate: Yup.date().required('Fecha de inicio es requerida'),
      endDate: Yup.date().required('Fecha de fin es requerida'),
    });
  }

  export function initialValues(deposit = {}) {
    return {
      startDate: dayjs(),
      endDate: dayjs(),
      totalM3: deposit.totalM3 || "",
    };
  }