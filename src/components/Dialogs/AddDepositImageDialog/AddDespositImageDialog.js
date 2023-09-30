import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState, useEffect } from "react";
import { DepositImages } from "../../Forms/RegisterDepositForm/DepositImages";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import { Box, DialogTitle, Stack, ThemeProvider } from "@mui/material";
import theme from "../../../theme/theme";

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
      <Dialog open={isDialogOpen} onClose={handleCancel} maxWidth="md">
        <Stack direction="row" alignItems="center">
          <DialogTitle
            sx={{
              ...theme.typography.montserratFont,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Agregar imágenes
          </DialogTitle>

          <Box flex={0} marginRight={1}>
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
        <DialogContent>
          {selectedDeposit && <DepositImages deposit={selectedDeposit} />}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
