import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  DialogTitle,
  Stack,
  ThemeProvider,
  Slide,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, forwardRef } from "react";
import { DepositAvailabilityCalendarTable } from "../../Tables";
import theme from "../../../theme/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        TransitionComponent={Transition}
      >
        <Stack direction="row" alignItems="center" marginRight={1}>
          <DialogTitle
            sx={{
              ...theme.typography.montserratFont,
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
