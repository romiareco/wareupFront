import { Service } from "../../../../api";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Stack,
  Divider,
  Box,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../../theme/theme";

const serviceController = new Service();

export function RegisterDepositServices({ formInformation }) {
  const [services, setServices] = React.useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [prevSelectedServices, setPrevSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPrevSelectedServices(selectedServices);
  }, [selectedServices]);

  useEffect(() => {
    if (
      selectedServices.length !== prevSelectedServices.length ||
      !selectedServices.every(
        (service, index) => service === prevSelectedServices[index]
      )
    ) {
      formInformation(selectedServices);
    }
  }, [selectedServices, prevSelectedServices, formInformation]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const serviceResponse = await serviceController.getAllServices();
        const servicesData = serviceResponse.serviceGroups;

        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" marginTop={3} marginBottom={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle1">
            Debe seleccionar al menos un servicio para poder continuar!
          </Typography>
          {services &&
            services.map((group) => (
              <Box key={group.id}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "left", // Alinea el texto a la izquierda
                  }}
                >
                  {group.title}
                </Typography>
                <FormGroup>
                  <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                    {group.services.map((service) => (
                      <FormControlLabel
                        key={service.id}
                        control={
                          <Checkbox
                            color="success"
                            onChange={(e) => {
                              const selectedServiceId = service.id;
                              const isSelected = e.target.checked;

                              if (isSelected) {
                                setSelectedServices((prevSelectedServices) => [
                                  ...prevSelectedServices,
                                  selectedServiceId,
                                ]);
                              } else {
                                setSelectedServices((prevSelectedServices) =>
                                  prevSelectedServices.filter(
                                    (id) => id !== selectedServiceId
                                  )
                                );
                              }
                            }}
                          />
                        }
                        label={service.title}
                      />
                    ))}
                  </Stack>
                </FormGroup>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
        </Box>
      )}
    </ThemeProvider>
  );
}
