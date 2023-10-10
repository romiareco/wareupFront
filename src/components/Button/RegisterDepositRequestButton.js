import React, { useState } from "react";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "../../theme/theme";
import { useAuth } from "../../hooks";
import { LoginDialog } from "../Dialogs/LoginDialog/LoginDialog";

export function RegisterDepositRequestButton() {
  const { user } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleButtonClick = () => {
    if (user) {
      // Si el usuario está logueado, redirige a /request-deposit
      window.location.href = "/request-deposit";
    } else {
      // Si el usuario no está logueado, muestra el diálogo de inicio de sesión
      setShowLoginDialog(true);
    }
  };

  const handleOpenLoginDialog = (isOpen) => {
    setShowLoginDialog(isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          color: theme.palette.common.white,
          borderColor: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          ml: 1,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        onClick={handleButtonClick}
      >
        Publica tu espacio
      </Button>
      <LoginDialog
        openDialog={showLoginDialog}
        onDialogOpenChange={handleOpenLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </ThemeProvider>
  );
}
