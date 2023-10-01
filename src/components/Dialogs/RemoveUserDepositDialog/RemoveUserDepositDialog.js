import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";
import { useState, useEffect, forwardRef } from "react";
import { Deposit } from "../../../api";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import { LoadingButton } from "@mui/lab";
import theme from "../../../theme/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
            <LoadingButton
              onClick={handleAccept}
              autoFocus
              loading={loading}
              disabled={loading}
            >
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
