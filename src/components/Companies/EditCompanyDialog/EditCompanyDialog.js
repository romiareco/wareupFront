import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { EditCompanyInformation } from "../EditCompanyInformation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

export function EditCompanyDialog({
  selectedCompany,
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
    <Dialog open={isDialogOpen} onClose={handleCancel}>
      <DialogContent>
        <IconButton onClick={() => handleCancel()}>
          <CloseIcon />
        </IconButton>
        {selectedCompany && <EditCompanyInformation company={selectedCompany} />}
      </DialogContent>
    </Dialog>
  );
}
