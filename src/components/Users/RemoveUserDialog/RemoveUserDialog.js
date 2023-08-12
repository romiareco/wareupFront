import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";

export function RemoveUserDialog({
  selectedUser,
  openDialog,
  onDialogOpenChange,
}) {
  const { accessToken } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsDialogOpen(openDialog);
      onDialogOpenChange(openDialog);
    })();
  }, [openDialog, onDialogOpenChange]);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleAccept = async () => {
    const userController = new User();
    try {
      await userController.deleteUser(accessToken, selectedUser.id);

      setNotificationMessage("Usuario actualizado exitosamente");
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Eliminar usuario"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        {selectedUser ? `¿Desea eliminar el usuario ${selectedUser.name}?` : ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleAccept} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Dialog>
  );
}
