import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { UserInformationProfile } from "../../Users";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

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
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleCancel}>
      <DialogContent>
        <IconButton onClick={() => handleCancel()}>
          <CloseIcon />
        </IconButton>
        {selectedUser && <UserInformationProfile user={selectedUser} />}
      </DialogContent>
    </Dialog>
  );
}
