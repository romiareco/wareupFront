import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  DialogTitle,
  Stack,
  ThemeProvider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import { AddDepositAvailability } from "../../Deposits";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

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
    <ThemeProvider theme={theme}>
      <Dialog
        TransitionComponent={CustomTransition}
        open={isDialogOpen}
        onClose={handleCancel}
        maxWidth="sm"
      >
        <Stack direction="row" alignItems="center" marginRight={1}>
          <DialogTitle
            sx={{
              ...theme.typography.montserratFont,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Agregar disponibilidad
          </DialogTitle>

          <IconButton onClick={() => handleCancel()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent style={{ paddingTop: 0 }}>
          {selectedDeposit && (
            <AddDepositAvailability deposit={selectedDeposit} />
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
