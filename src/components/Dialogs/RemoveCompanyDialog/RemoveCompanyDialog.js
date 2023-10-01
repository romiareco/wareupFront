import * as React from "react";
import {
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Company } from "../../../api";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { LoadingButton } from "@mui/lab";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { companyStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

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
      if (selectedCompany.status === companyStatus.DELETED) {
        return (
          <ErrorDialog
            errorMessage={"La empresa ya fue eliminada anteriormente."}
            openDialog={openDialog}
            onDialogOpenChange={onDialogOpenChange}
          />
        );
      }

      setLoading(true);

      await companyController.delete(accessToken, selectedCompany.id);

      setNotificationMessage("Empresa eliminada exitosamente");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setLoading(false);
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setLoading(false);
    }
  };

  if (
    selectedCompany &&
    parseInt(selectedCompany.status) === companyStatus.DELETED
  ) {
    return (
      <ErrorDialog
        errorMessage={"La empresa ya se encuentra eliminada."}
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
            Eliminar empresa{" "}
          </DialogTitle>

          <IconButton onClick={() => handleCancel()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContentText marginBottom={1}>
          {selectedCompany ? (
            <>
              <Typography
                variant="body1"
                style={{
                  textAlign: "center", // Centra el texto horizontalmente
                  marginBottom: "8px", // Espacio en la parte inferior
                }}
              >
                {`¿Desea eliminar la empresa ${selectedCompany.businessName}?`}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                marginLeft={2}
                marginRight={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WarningRoundedIcon
                  sx={{
                    verticalAlign: "middle", // Alinea verticalmente con el texto
                    marginRight: "4px",
                    color: "red", // Establece el color en "error" (rojo)
                  }}
                />
                Ten en cuenta que también se eliminarán los depósitos asociados.
              </Typography>
            </>
          ) : (
            ""
          )}
        </DialogContentText>
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            variant="contained"
            onClick={handleAccept}
            autoFocus
            loading={loading}
          >
            Aceptar
          </LoadingButton>
          <Button variant="outlined" autoFocus onClick={handleCancel}>
            Cancelar
          </Button>
        </DialogActions>
        <NotificationSnackbar
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          severity={notificationSeverity}
          message={notificationMessage}
        />
      </Dialog>
    </ThemeProvider>
  );
}
