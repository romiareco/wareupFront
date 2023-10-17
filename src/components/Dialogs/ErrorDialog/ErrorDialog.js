import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { DialogTitle, Typography, ThemeProvider } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error"; // Importa un icono de error rojo aquí
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

export function ErrorDialog({ errorMessage, openDialog, onDialogOpenChange }) {
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

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        TransitionComponent={CustomTransition}
        keepMounted
      >
        <IconButton
          onClick={() => handleCancel()}
          style={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <Typography
            variant="h6"
            style={{ color: "red", display: "flex", alignItems: "center" }}
          >
            <ErrorIcon style={{ marginRight: "8px" }} /> Error
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
