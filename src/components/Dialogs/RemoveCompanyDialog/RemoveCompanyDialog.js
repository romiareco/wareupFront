import * as React from "react";
import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { Company } from "../../../api";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import CircularProgress from "@mui/material/CircularProgress";

export function RemoveCompanyDialog({
  selectedCompany,
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
    const companyController = new Company();
    try {
      setLoading(true); // Inicia la carga

      await companyController.delete(accessToken, selectedCompany.id);

      setNotificationMessage("Empresa eliminada exitosamente");
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

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Eliminar empresa"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedCompany ? (
            <>
              <Typography variant="body1">
                {`¿Desea eliminar la empresa ${selectedCompany.businessName}?`}
              </Typography>
              <Typography variant="body1" paragraph>
                Ten en cuenta que también se eliminarán los depósitos asociados.
              </Typography>
            </>
          ) : (
            ""
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Button onClick={handleAccept} autoFocus disabled={loading}>
            Aceptar
          </Button>
        )}
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
