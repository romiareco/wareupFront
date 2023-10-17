import { depositRequestStatus } from "../../../../utils";
import { ErrorDialog } from "../../ErrorDialog";
import { ChangeRequestDepositStatusDialog } from "../ChangeRequestDepositStatusDialog";

export function CancelRequestDeposit({
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
        errorMessage={"La solicitud ya fue cancelada anteriormente."}
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
        errorMessage={
          "No se puede cambiar el estado de una solicitud ya confirmada."
        }
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
      requestDepositStatusMessage="cancelar"
      requestDepositStatus={depositRequestStatus.CANCELED}
    />
  );
}
