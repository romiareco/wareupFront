import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { Deposit } from "../../../api";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";

export function RemoveUserDepositDialog({
  selectedDeposit,
  openDialog,
  onDialogOpenChange,
}) {
  const { accessToken } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleAccept = async () => {
    const depositController = new Deposit();
    try {
      setLoading(true); // Inicia la carga

      await depositController.deleteDeposit(accessToken, selectedDeposit.id);

      setNotificationMessage("Depósito eliminado exitosamente");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setLoading(false); // Finaliza la carga, sin importar el resultado
      setIsDialogOpen(false);
      onDialogOpenChange(false);
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);

      setLoading(false); // Finaliza la carga, sin importar el resultado
    }
  };

  if (
    selectedDeposit &&
    parseInt(selectedDeposit.status) === depositStatus.DELETED
  ) {
    return (
      <ErrorDialog
        errorMessage={"No se puede eliminar un depósito que ya fue eliminado."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  return (
    <Box>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Eliminar depósito"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedDeposit
              ? `¿Desea eliminar el depósito con id ${selectedDeposit.id}?`
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Button onClick={handleAccept} autoFocus disabled={loading}>
                Aceptar
              </Button>
            )}
            <Button autoFocus onClick={handleCancel}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogActions>
      </Dialog>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
}
