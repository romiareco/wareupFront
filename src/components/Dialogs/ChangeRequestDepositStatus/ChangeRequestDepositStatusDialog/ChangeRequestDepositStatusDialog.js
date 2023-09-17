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
import { useAuth } from "../../../../hooks";
import { NotificationSnackbar } from "../../../NotificationSnackbar";
import { RequestDeposit } from "../../../../api";
import { LoadingButton } from "@mui/lab";

export function ChangeRequestDepositStatusDialog({
  selectedRequestDeposit,
  openDialog,
  onDialogOpenChange,
  requestDepositStatusMessage,
  requestDepositStatus,
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
    const requestDepositController = new RequestDeposit();
    try {
      setLoading(true);
      await requestDepositController.updateRequestDepositStatus(
        accessToken,
        selectedRequestDeposit.id,
        requestDepositStatus
      );

      setNotificationMessage("Solicitud de registro actualizada exitosamente");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setLoading(false);
      setIsDialogOpen(false);
      onDialogOpenChange(false);
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);

      setLoading(false);
    }
  };

  return (
    <Box>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Actualizar solicitud de registro"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedRequestDeposit
              ? `¿Desea ${requestDepositStatusMessage} la solicitud de registro con id ${selectedRequestDeposit.id}?`
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <LoadingButton onClick={handleAccept} autoFocus disabled={loading}>
              Aceptar
            </LoadingButton>
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
