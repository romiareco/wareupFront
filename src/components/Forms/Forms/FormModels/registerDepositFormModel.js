export const registerDepositFormModel = {
    formId: 'registerDepositForm',
    formField: {
      companyId: {
        name: 'companyId',
        label: 'Empresa',
        requiredErrorMsg: 'Debe seleccionar una empresa'
      },
      street: {
        name: 'street',
        label: 'Dirección',
        requiredErrorMsg: 'Debe cargar la dirección'
      },
      postalCode: {
        name: 'postalCode',
        label: 'Código postal',
        requiredErrorMsg: 'Address Line 1 is required'
      },
      totalM3: {
        name: 'totalM3',
        label: 'Total de M3'
      },
      departmentId: {
        name: 'departmentId',
        label: 'Departamento',
        requiredErrorMsg: 'City is required'
      },
      cityId: {
        name: 'cityId',
        label: 'Ciudad'
      },
      expectedPrice: {
        name: 'expectedPrice',
        label: 'Precio',
        requiredErrorMsg: 'Zipcode is required'
      },
      description: {
        name: 'description',
        label: 'Descripción',
        requiredErrorMsg: 'Country is required'
      }
    }
  };