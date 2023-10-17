import { Box, FormGroup, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ENV } from "../../utils";
import { Service } from "../../api";
import { ServiceCheckbox } from "./ServiceCheckbox";

const serviceController = new Service();

export function CertificationsFilter({ onCertificationsChange }) {
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
    onCertificationsChange(selectedServices);
  }, [selectedServices, onCertificationsChange]);

  useEffect(() => {
    (async () => {
      try {
        const response = await serviceController.getServiceGroupById(
          ENV.SERVICE_GROUPS.CERT_GROUP_ID
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

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Certificaciones
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
