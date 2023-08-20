import { RequestDeposit } from "../../components/Forms/RequestDepositForm";
import { Footer } from "../../components/Footer";
import { Fragment } from "react";

export function UserRequestDeposit() {
  return (
    <Fragment>
      <RequestDeposit />
      <Footer />
    </Fragment>
  );
}
