import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
} from "@mui/material";
import { Service } from "../../api";
import { ENV } from "../../utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const serviceController = new Service();

export function LaboralDaysFilter({ onLaboralDaysChange }) {
  const [services, setServices] = useState([]);
  const [selectedLaboralDays, setSelectedLaboralDays] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedLaboralDays(
      typeof value === "string"
        ? value.split(",").map((label) => ({
            id: services.find((service) => service.title === label)?.id || null,
            title: label,
          }))
        : value.map((label) => ({
            id: services.find((service) => service.title === label)?.id || null,
            title: label,
          }))
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await serviceController.getServiceGroupById(
          ENV.SERVICE_GROUPS.LABORAL_DAYS_SERVICE_GROUP_ID
        );

        if (response && response.serviceGroup.services.length > 0) {
          const filteredInformation = response.serviceGroup.services.map(
            (service) => ({
              id: service.id,
              title: service.title,
            })
          );

          setServices(filteredInformation);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    onLaboralDaysChange(selectedLaboralDays);
  }, [selectedLaboralDays, onLaboralDaysChange]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Disponibilidad de tiempo
      </Typography>
      <Typography variant="body" gutterBottom>
        Indique su preferencia en base a los días laborales que desea que el
        depósito esté disponible.{" "}
      </Typography>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Días laborales</InputLabel>
          <Select
            multiple
            value={selectedLaboralDays.map((service) => service.title)}
            onChange={handleChange}
            input={<OutlinedInput label="Días laborales" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((service) => (
                  <Chip label={service} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.title}>
                {service.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
