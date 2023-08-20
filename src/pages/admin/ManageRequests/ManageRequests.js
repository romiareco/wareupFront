import { SiteUnderConstruction } from "../../../components";
import { DepositImages } from "../../../components/Forms/RegisterDepositForm/DepositImages";

export function ManageRequests() {
  const depositId = 28;
  return (
   <DepositImages depositCreated={depositId} />
  );
}
