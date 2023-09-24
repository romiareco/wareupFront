import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ENV } from "../../utils";
import { Service } from "../../api";
import { ServiceCheckbox } from "./ServiceCheckbox";

const serviceController = new Service();



export function DepositSpecificationsFilter({ onDepositSpecificationsChange }) {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceToggle = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  useEffect(() => {
    onDepositSpecificationsChange(selectedServices);
  }, [selectedServices, onDepositSpecificationsChange]);

  useEffect(() => {
    (async () => {
      try {
        const response = await serviceController.getAllServices();

        if (response && response.serviceGroups && response.serviceGroups.length > 0) {
          const specificationsGroups = response.serviceGroups.map((serviceGroup) => {
            if (serviceGroup.id === ENV.SERVICE_GROUPS.DEPOSITS_TYPE_SERVICE_GROUP_ID || serviceGroup.id === ENV.SERVICE_GROUPS.OTHERS_GROUP_ID) {
              const filteredServices = serviceGroup.services.map((service) => ({
                id: service.id,
                title: service.title,
              }));
              return filteredServices;
            }
            return null; // Si no coincide, puedes devolver null o un valor vacío, según tus necesidades.
          });
          
          // Ahora specificationsGroups contendrá una lista de listas de servicios filtrados
          // Puedes combinarlas en una sola lista si es necesario
          const allFilteredServices = specificationsGroups.flat().filter(Boolean);
          setServices(allFilteredServices);
        }

      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Características del depósito
      </Typography>
      <Box>
        <FormGroup>
          <Grid container spacing={2}>
            {services.map((service) => (
              <ServiceCheckbox
                key={service.id}
                service={service}
                selectedServices={selectedServices}
                handleServiceToggle={handleServiceToggle}
              />
            ))}
          </Grid>
        </FormGroup>
      </Box>
    </Stack>
  );
}
