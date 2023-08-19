import {registerDepositFormModel} from "./registerDepositFormModel";

const {
    formField: {
        companyId,
        street,
        postalCode,
        totalM3,
        departmentId,
        cityId,
        expectedPrice,
        description,
    }
} = registerDepositFormModel;

export const formInitialValues = {
    [companyId.name]: '',
    [street.name]: '',
    [postalCode.name]: '',
    [totalM3.name]: '',
    [departmentId.name]: '',
    [cityId.name]: '',
    [expectedPrice.name]: '',
    [description.name]: ''
  };