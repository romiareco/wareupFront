import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { CardContent } from "semantic-ui-react";
import { DepositAvailabilityCalendarTable } from "../../Tables";

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
    <CardContent>
      <Dialog open={isDialogOpen} onClose={handleCancel} maxWidth="xl" fullWidth>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle>Disponibilidad del depósito</DialogTitle>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleCancel()}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent style={{ paddingTop: 0 }} fullWidth>
          {selectedDeposit && (
            <DepositAvailabilityCalendarTable deposit={selectedDeposit} />
          )}
        </DialogContent>
      </Dialog>
    </CardContent>
  );
}
