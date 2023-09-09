import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import { AddDepositAvailability } from "../../Deposits";
import { CardContent } from "semantic-ui-react";

export function AddDepositAvailabilityDialog({
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

  if (
    selectedDeposit &&
    parseInt(selectedDeposit.status) === depositStatus.DELETED
  ) {
    return (
      <ErrorDialog
        errorMessage={"No se puede editar un depósito ya eliminado."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  return (
    <CardContent>
      <Dialog open={isDialogOpen} onClose={handleCancel} maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle>Agregar disponibilidad</DialogTitle>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleCancel()}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent style={{ paddingTop: 0 }}>
          {selectedDeposit && (
            <AddDepositAvailability deposit={selectedDeposit} />
          )}
        </DialogContent>
      </Dialog>
    </CardContent>
  );
}
