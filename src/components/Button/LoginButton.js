import Button from "@mui/material/Button";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { LoginDialog } from "../Dialogs/LoginDialog/LoginDialog";
import { useState } from "react";

export function LoginButton() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleButtonClick = () => {
    window.gtag("event", "login_button_click", {
      method: "click",
    });
    setShowLoginDialog(true);
  };

  const handleOpenLoginDialog = (isOpen) => {
    setShowLoginDialog(isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          borderColor: theme.palette.secondary.main,
          mr: 1,
          ml: 1,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
        onClick={handleButtonClick}
      >
        Acceder
      </Button>
      <LoginDialog
        openDialog={showLoginDialog}
        onDialogOpenChange={handleOpenLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </ThemeProvider>
  );
}
