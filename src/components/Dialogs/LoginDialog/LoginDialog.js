import {
  Dialog,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../../theme/theme";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTransition } from "../CustomTransition";
import { Login } from "../../Forms";
import { useNavigate, useLocation } from "react-router-dom";

export function LoginDialog({ openDialog, onDialogOpenChange }) {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleLoginSuccess = () => {
    setIsDialogOpen(false);
    onDialogOpenChange(false);

    const currentPathname = location.pathname; // Ruta actual

    if (currentPathname === "/register") {
      navigate("/");
    }
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
        <DialogContent>
          <Login onLoginSuccess={handleLoginSuccess} />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
