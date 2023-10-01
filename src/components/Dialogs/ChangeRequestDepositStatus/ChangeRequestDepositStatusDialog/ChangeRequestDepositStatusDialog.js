import * as React from "react";
import {
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  DialogContentText,
  DialogTitle,
  Slide,
  ThemeProvider,
} from "@mui/material";
import { useState, useEffect, forwardRef } from "react";
import { useAuth } from "../../../../hooks";
import { NotificationSnackbar } from "../../../NotificationSnackbar";
import { DepositRequest } from "../../../../api";
import { LoadingButton } from "@mui/lab";
import theme from "../../../../theme/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    const depositRequestController = new DepositRequest();
    try {
      setLoading(true);
      await depositRequestController.updateRequestDepositStatus(
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
    <ThemeProvider theme={theme}>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            ...theme.typography.montserratFont,
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
          }}
        >
          {"Actualizar solicitud de registro"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              ...theme.typography.montserratFont,
            }}
          >
            {selectedRequestDeposit
              ? `¿Desea ${requestDepositStatusMessage} la solicitud de registro con id ${selectedRequestDeposit.id}?`
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <LoadingButton onClick={handleAccept} loading={loading} autoFocus disabled={loading}>
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
    </ThemeProvider>
  );
}
