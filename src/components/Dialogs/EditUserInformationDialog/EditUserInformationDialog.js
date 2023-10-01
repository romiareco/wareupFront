import { DialogContent, Dialog, Slide } from "@mui/material";
import { UserInformationProfile } from "../../Users";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      TransitionComponent={Transition}
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
