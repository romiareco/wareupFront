import * as React from "react";
import { useState, useEffect } from "react";
import { DepositImages } from "../../Forms/RegisterDepositForm/DepositImages";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import {
  DialogTitle,
  Stack,
  ThemeProvider,
  Dialog,
  DialogContent,
} from "@mui/material";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

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

  if (
    selectedDeposit &&
    parseInt(selectedDeposit.status) === depositStatus.DELETED
  ) {
    return (
      <ErrorDialog
        errorMessage={
          "No se puede agregar imágenes a un depósito que fue eliminado."
        }
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={CustomTransition}
        onClose={handleCancel}
        maxWidth="md"
      >
        <Stack direction="row" alignItems="center">
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Agregar imágenes
          </DialogTitle>

          <IconButton onClick={() => handleCancel()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent style={{ paddingTop: 0 }}>
          {selectedDeposit && <DepositImages deposit={selectedDeposit} />}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
