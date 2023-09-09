import Dialog from "@mui/material/Dialog";
import {DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { EditDepositBasicData } from "../../Deposits/EditDepositBasicData";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";

export function EditDepositBasicDataDialog({
  selectedDeposit,
  openDialog,
  onDialogOpenChange,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsDialogOpen(openDialog);
      onDialogOpenChange(openDialog);
    })();
  }, [openDialog, onDialogOpenChange]);

  const handleCancel = () => {
    setIsDialogOpen(false);
    onDialogOpenChange(false);
  };

  if(selectedDeposit && parseInt(selectedDeposit.status) === depositStatus.DELETED) {
    return (<ErrorDialog 
    errorMessage={"No se puede editar un depósito ya eliminado."}
    openDialog={openDialog}
    onDialogOpenChange={onDialogOpenChange}/>);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCancel}
      maxWidth="lg"
    >
      <DialogContent>
        <IconButton onClick={() => handleCancel()}>
          <CloseIcon />
        </IconButton>
        {selectedDeposit && <EditDepositBasicData deposit={selectedDeposit} />}
      </DialogContent>
    </Dialog>
  );
}
