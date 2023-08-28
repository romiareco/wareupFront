import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { DepositImages } from "../../Forms/RegisterDepositForm/DepositImages";

export function AddDepositImageDialog({
  deposit,
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

  const handleAccept = () => {
    <DepositImages deposit={deposit} />;
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Agregar imágenes"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`¿Desea agregar imágenes al depósito con id ${deposit.id}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} autoFocus>
          Aceptar
        </Button>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
