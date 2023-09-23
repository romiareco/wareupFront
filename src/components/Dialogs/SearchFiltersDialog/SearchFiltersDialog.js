import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  TextField,
  Slider,
  Box,
} from "@mui/material";
import { forwardRef, useState } from "react";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import {
  CertificationsFilter,
  DepositSpecificationsFilter,
  HabilitationsFilter,
  LaboralDaysFilter,
  PriceRangeFilter,
  TotalM3RangeFilter,
} from "../../Filters";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function SearchFiltersDialog({ open, handleClose }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]);
  const [selectedTotalM3Range, setSelectedTotalM3Range] = useState([0, 1000]);
  const [selectedLaboralDays, setSelectedLaboralDays] = useState([]);
  const [selectedDepositSpecifications, setSelectedDepositSpecifications] =
    useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [selectedHabilitations, setSelectedHabilitations] = useState([]);

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const handleTotalM3RangeChange = (totalM3Range) => {
    setSelectedTotalM3Range(totalM3Range);
  };

  const handleLaboralDaysChange = (laboralDays) => {
    setSelectedLaboralDays(laboralDays);
  };

  const handleDepositSpecificationsChange = (depositSpecifications) => {
    setSelectedDepositSpecifications(depositSpecifications);
  };

  const handleCertificationsChange = (certifications) => {
    setSelectedCertifications(certifications);
  };

  const handleHabilitationsChange = (habilitations) => {
    setSelectedHabilitations(habilitations);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" style={{ flex: 1, textAlign: "center" }}>
          Filtros
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box marginBottom={2}>
          <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} />
        </Box>
        <Divider />
        <Box marginTop={2} marginBottom={2}>
          <TotalM3RangeFilter onTotalM3RangeChange={handleTotalM3RangeChange} />
        </Box>
        <Divider />
        <Box marginTop={2} marginBottom={2}>
          <LaboralDaysFilter onLaboralDaysChange={handleLaboralDaysChange} />
        </Box>
        <Divider />
        <Box marginTop={2} marginBottom={2}>
          <DepositSpecificationsFilter
            onDepositSpecificationsChange={handleDepositSpecificationsChange}
          />
        </Box>
        <Divider />
        <Box marginTop={2} marginBottom={2}>
          <CertificationsFilter
            onCertificationsChange={handleCertificationsChange}
          />
        </Box>
        <Divider />
        <Box marginTop={2} marginBottom={2}>
          <HabilitationsFilter
            onHabilitationsChange={handleHabilitationsChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Filtrar</Button>
      </DialogActions>
    </Dialog>
  );
}
