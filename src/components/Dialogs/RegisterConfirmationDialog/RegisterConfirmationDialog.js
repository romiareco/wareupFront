import {
  Box,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";
import { LoadingButton } from "@mui/lab";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export function RegisterConfirmationDialog({
  openDialog,
  onDialogOpenChange,
  message,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsDialogOpen(openDialog);
      onDialogOpenChange(openDialog);
    })();
  }, [openDialog, onDialogOpenChange]);

  const handleClose = () => {
    setIsDialogOpen(false);
    onDialogOpenChange(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={CustomTransition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Solicitud de registro exitoso
          <CheckRoundedIcon sx={{ color: "green", marginLeft: 1 }} />
        </DialogTitle>
        <Divider />
        <DialogContentText>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", textAlign: "center" }}
          >
            ¡Muchas gracias por elegirnos!{"\n"}
           {message}{"\n"}
            El equipo de Ware Up en breve se pondrá en contacto contigo para
            continuar con el proceso.
          </Typography>
        </DialogContentText>
        <DialogActions>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <LoadingButton
              size="medium"
              variant="contained"
              onClick={handleClose}
            >
              Aceptar
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
