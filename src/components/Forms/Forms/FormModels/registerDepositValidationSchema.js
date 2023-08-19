/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";
import { registerDepositFormModel } from "./registerDepositFormModel";

const {
  formField: { street, departmentId, description },
} = registerDepositFormModel;

export const validationSchema = [
  Yup.object().shape({
    [description.name]: Yup.string().required(
      `${description.requiredErrorMsg}`
    ),
    [departmentId.name]: Yup.string()
      .nullable()
      .required(`${departmentId.requiredErrorMsg}`),
    [street.name]: Yup.string().required(`${street.requiredErrorMsg}`),
  }),
];
