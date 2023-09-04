import { depositRequestStatus } from "../../../../utils";
import { ChangeRequestDepositStatusDialog } from "../ChangeRequestDepositStatusDialog";


export function CancelRequestDeposit({
    selectedRequestDeposit,
    openDialog,
    onDialogOpenChange,
  }) {
    return (
        <ChangeRequestDepositStatusDialog 
        selectedRequestDeposit={selectedRequestDeposit}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
        requestDepositStatus={depositRequestStatus.CANCELED} />
    )
}