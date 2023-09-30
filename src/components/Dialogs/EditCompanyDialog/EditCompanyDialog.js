import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { EditCompanyInformation } from "../../Companies/EditCompanyInformation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { companyStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import { DialogTitle, Stack } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";

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

  if (
    selectedCompany &&
    parseInt(selectedCompany.status) === companyStatus.DELETED
  ) {
    return (
      <ErrorDialog
        errorMessage={"No se puede editar una empresa ya eliminada."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={isDialogOpen} onClose={handleCancel} maxWidth="md">
        <Stack direction="row" alignItems="center">
          <DialogTitle
            sx={{
              ...theme.typography.montserratFont,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Modifique su empresa{" "}
          </DialogTitle>

          <IconButton onClick={() => handleCancel()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent>
          {selectedCompany && (
            <EditCompanyInformation company={selectedCompany} />
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
