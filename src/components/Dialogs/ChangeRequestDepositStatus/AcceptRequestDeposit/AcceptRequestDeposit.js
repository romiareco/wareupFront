import { depositRequestStatus } from "../../../../utils";
import { ChangeRequestDepositStatusDialog } from "../ChangeRequestDepositStatusDialog";
import { ErrorDialog } from "../../ErrorDialog";

export function AcceptRequestDeposit({
  selectedRequestDeposit,
  openDialog,
  onDialogOpenChange,
}) {
  if (
    selectedRequestDeposit &&
    parseInt(selectedRequestDeposit.status) === depositRequestStatus.CANCELED
  ) {
    return (
      <ErrorDialog
        errorMessage={"La solicitud ya fue cancelada, no se puede aprobar."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  if (
    selectedRequestDeposit &&
    parseInt(selectedRequestDeposit.status) === depositRequestStatus.COMPLETED
  ) {
    return (
      <ErrorDialog
        errorMessage={"La solicitud ya fue aceptada anteriormente."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  return (
    <ChangeRequestDepositStatusDialog
      selectedRequestDeposit={selectedRequestDeposit}
      openDialog={openDialog}
      onDialogOpenChange={onDialogOpenChange}
      requestDepositStatus="completar"
    />
  );
}
