import { useLocation } from "react-router-dom";
import { DepositsMap } from "../../components/Maps";

export function MapSearcher() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const cityValue = queryParams.get("city");
  const departmentValue = queryParams.get("department");

  return <DepositsMap city={cityValue} department={departmentValue} />;
}
