import { depositRequestStatus } from "../../../../utils";
import { ChangeRequestDepositStatusDialog } from "../ChangeRequestDepositStatusDialog";

export function AcceptRequestDeposit({
    selectedRequestDeposit,
    openDialog,
    onDialogOpenChange,
  }) {
    return (
        <ChangeRequestDepositStatusDialog 
        selectedRequestDeposit={selectedRequestDeposit}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
        requestDepositStatus={depositRequestStatus.COMPLETED} />
    )
}