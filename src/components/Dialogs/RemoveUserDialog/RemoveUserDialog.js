import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect, forwardRef } from "react";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { LoadingButton } from "@mui/lab";
import { Slide, ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    const userController = new User();
    try {
      setLoading(true);

      await userController.deleteUser(accessToken, selectedUser.id);

      setNotificationMessage("Usuario actualizado exitosamente");
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
          {"Eliminar usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedUser ? (
              <>
                <Typography
                  variant="body1"
                  style={{
                    textAlign: "center", // Centra el texto horizontalmente
                    marginBottom: "8px", // Espacio en la parte inferior
                  }}
                  sx={theme.typography.montserratFont}
                >
                  {`¿Desea eliminar el usuario ${selectedUser.name}?`}
                </Typography>
              </>
            ) : (
              ""
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <LoadingButton
              onClick={handleAccept}
              autoFocus
              disabled={loading}
              loading={loading}
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
