import { RequestStorage } from "../../components/Forms/RequestStorageForm";
import { Footer } from "../../components/Footer";
import { Fragment } from "react";

export function UserHasStorage() {
  return (
    <Fragment>
      <RequestStorage />
      <Footer />
    </Fragment>
  );
}
