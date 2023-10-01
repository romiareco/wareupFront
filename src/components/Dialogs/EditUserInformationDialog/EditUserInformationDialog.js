import { DialogContent, Dialog } from "@mui/material";
import { UserInformationProfile } from "../../Users";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { CustomTransition } from "../CustomTransition";

export function EditUserInformationDialog({
  selectedUser,
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
    <Dialog
      open={isDialogOpen}
      onClose={handleCancel}
      TransitionComponent={CustomTransition}
    >
      <DialogContent>
        <IconButton onClick={() => handleCancel()}>
          <CloseIcon />
        </IconButton>
        {selectedUser && <UserInformationProfile user={selectedUser} />}
      </DialogContent>
    </Dialog>
  );
}
