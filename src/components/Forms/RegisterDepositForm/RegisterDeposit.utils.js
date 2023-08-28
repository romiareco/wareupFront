export function buildStructuredBodyData(steps, data) {
  const structuredData = {};

  for (const [stepName, stepData] of Object.entries(data)) {
    const stepIndex = steps.indexOf(stepName);

    if (stepIndex === 0) {
      structuredData.totalM3 = stepData.totalM3;
      structuredData.companyId = stepData.companyId;
      structuredData.departmentId = stepData.departmentId;
      structuredData.cityId = stepData.cityId;
      structuredData.expectedPrice = stepData.expectedPrice;
      structuredData.description = stepData.description;
      structuredData.postalCode = stepData.postalCode;
      structuredData.street = stepData.street;
      structuredData.currency = stepData.currency;
    } else if (stepIndex === 1) {
      structuredData.servicesId = stepData;
    }

    console.log(structuredData);
  }
  return structuredData;
}

export function isStepValid(stepIndex, steps, formData) {
  const stepKey = steps[stepIndex];
  const stepData = formData[stepKey]; // Datos del primer paso

  switch (stepIndex) {
    case 0:
      return (
        stepData &&
        stepData.hasOwnProperty("companyId") &&
        stepData.hasOwnProperty("expectedPrice") &&
        stepData.hasOwnProperty("description") &&
        stepData.hasOwnProperty("cityId") &&
        stepData.hasOwnProperty("departmentId") &&
        stepData.hasOwnProperty("totalM3") &&
        stepData.hasOwnProperty("currency") &&
        stepData.hasOwnProperty("street")
      );
    case 1:
      return stepData && stepData.length !== 0;
    case 2:
      return true;
    default:
      return false;
  }
}

export function isLastStep(stepIndex, steps) {
  return stepIndex === steps.length;
};
