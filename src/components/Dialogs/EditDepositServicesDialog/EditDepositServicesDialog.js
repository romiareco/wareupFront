import Dialog from "@mui/material/Dialog";
import {
  Box,
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
import { EditDepositServices } from "../../Deposits";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

export function EditDepositServicesDialog({
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
        open={isDialogOpen}
        onClose={handleCancel}
        maxWidth="md"
        TransitionComponent={CustomTransition}
      >
        <Stack direction="row" alignItems="center">
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Servicios del depósito
          </DialogTitle>

          <Box flex={0}>
            {" "}
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>

        <DialogContent>
          {selectedDeposit && <EditDepositServices deposit={selectedDeposit} />}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
