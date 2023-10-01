import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  CertificationsFilter,
  DepositSpecificationsFilter,
  HabilitationsFilter,
  LaboralDaysFilter,
  PriceRangeFilter,
  TotalM3RangeFilter,
} from "../../Filters";
import { ENV } from "../../../utils";
import { CustomTransition } from "../CustomTransition";

export function SearchFiltersDialog({ open, handleClose, onApplyFilters }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState([
    ENV.MIN_MAX_FILTERS.MIN_PRICE,
    ENV.MIN_MAX_FILTERS.MAX_PRICE,
  ]);
  const [selectedTotalM3Range, setSelectedTotalM3Range] = useState([
    ENV.MIN_MAX_FILTERS.MIN_TOTAL_M3,
    ENV.MIN_MAX_FILTERS.MAX_TOTAL_M3,
  ]);
  const [selectedLaboralDays, setSelectedLaboralDays] = useState([]);
  const [selectedDepositSpecifications, setSelectedDepositSpecifications] =
    useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [selectedHabilitations, setSelectedHabilitations] = useState([]);

  const handleApplyFilters = () => {
    let laboralDays = [];
    if (selectedLaboralDays) {
      laboralDays = selectedLaboralDays.map((laboralDay) => laboralDay.id);
    }

    const filters = {
      servicesId: selectedDepositSpecifications.concat(
        selectedHabilitations,
        selectedCertifications,
        laboralDays
      ),
    };

    if (selectedPriceRange) {
      if (selectedPriceRange[0] !== ENV.MIN_MAX_FILTERS.MIN_PRICE) {
        filters.fromPrice = selectedPriceRange[0];
      }
      if (
        selectedPriceRange.length > 1 &&
        selectedPriceRange[1] !== ENV.MIN_MAX_FILTERS.MAX_PRICE
      ) {
        filters.toPrice = selectedPriceRange[1];
      }
    }

    if (selectedTotalM3Range) {
      if (selectedTotalM3Range[0] !== ENV.MIN_MAX_FILTERS.MIN_TOTAL_M3) {
        filters.fromTotalM3 = selectedTotalM3Range[0];
      }
      if (
        selectedTotalM3Range.length > 1 &&
        selectedTotalM3Range[1] !== ENV.MIN_MAX_FILTERS.MAX_TOTAL_M3
      ) {
        filters.toTotalM3 = selectedTotalM3Range[1];
      }
    }

    onApplyFilters(filters);
  };

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
      TransitionComponent={CustomTransition}
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
        <div style={{ flex: 1, textAlign: "center", fontSize: "30px" }}>
          Filtros
        </div>
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
        <Button size="medium" variant="contained" onClick={handleApplyFilters}>
          Aplicar filtros
        </Button>
      </DialogActions>
    </Dialog>
  );
}
