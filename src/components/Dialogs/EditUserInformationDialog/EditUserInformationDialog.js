import { DialogContent, Dialog } from "@mui/material";
import { UserInformationProfile } from "../../Users";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { CustomTransition } from "../CustomTransition";
import { userStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";

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

  if (selectedUser && parseInt(selectedUser.status) === userStatus.DELETED) {
    return (
      <ErrorDialog
        errorMessage={"No se puede editar un usuario que fue eliminado."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

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
