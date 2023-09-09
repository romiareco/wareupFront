import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState, useEffect } from "react";
import { DepositImages } from "../../Forms/RegisterDepositForm/DepositImages";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";

export function AddDepositImageDialog({
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
    errorMessage={"No se puede agregar imágenes a un depósito que fue eliminado."}
    openDialog={openDialog}
    onDialogOpenChange={onDialogOpenChange}/>);
  }


  return (
    <Dialog open={isDialogOpen} onClose={handleCancel}>
      <DialogContent>
        <IconButton onClick={() => handleCancel()}>
          <CloseIcon />
        </IconButton>
        {selectedDeposit && <DepositImages deposit={selectedDeposit} />}
      </DialogContent>
    </Dialog>
  );
}
