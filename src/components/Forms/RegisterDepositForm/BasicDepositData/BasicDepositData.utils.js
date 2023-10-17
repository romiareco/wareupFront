export function isFormComplete(formData) {
  return (
    formData.hasOwnProperty("companyId") &&
      formData.companyId !== "" &&
      formData.hasOwnProperty("expectedPrice") &&
      formData.expectedPrice !== "" &&
      formData.hasOwnProperty("description") &&
      formData.description !== "" &&
      formData.hasOwnProperty("cityId") &&
      formData.cityId !== "" &&
      formData.hasOwnProperty("departmentId") &&
      formData.departmentId !== "" &&
      formData.hasOwnProperty("totalM3") &&
      formData.totalM3 !== "" &&
      formData.hasOwnProperty("currency") &&
      formData.currency !== "",
    formData.hasOwnProperty("address") &&
      formData.address !== "" &&
      formData.hasOwnProperty("minimumBusinessPeriod") &&
      formData.minimumBusinessPeriod !== "" &&
      formData.hasOwnProperty("minimumBusinessVolume") &&
      formData.minimumBusinessVolume !== ""
  );
}
