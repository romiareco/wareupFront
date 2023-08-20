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
    formData.hasOwnProperty("street") &&
    formData.street !== ""
  );
}
