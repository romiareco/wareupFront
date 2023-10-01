import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  DialogTitle,
  Stack,
  ThemeProvider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { DepositAvailabilityCalendarTable } from "../../Tables";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

export function ViewDepositCalendarAvailabilityDialog({
  selectedDeposit,
  openDialog,
  onDialogOpenChange,
}) {
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
        maxWidth="sm"
        fullWidth
        TransitionComponent={CustomTransition}
      >
        <Stack direction="row" alignItems="center" marginRight={1}>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Disponibilidad del depósito
          </DialogTitle>

          <IconButton onClick={() => handleCancel()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent style={{ paddingTop: 0 }} fullWidth>
          {selectedDeposit && (
            <DepositAvailabilityCalendarTable deposit={selectedDeposit} />
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
