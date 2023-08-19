import { Service } from "../../../../api";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Stack,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../../theme/theme";

const serviceController = new Service();

export function RegisterDepositServices({ formInformation }) {
  const { accessToken } = useAuth();
  const [services, setServices] = React.useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [prevSelectedServices, setPrevSelectedServices] = useState([]);

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
        const serviceResponse = await serviceController.getAllServices(
          accessToken
        );
        const servicesData = serviceResponse.serviceGroups;

        setServices(servicesData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="subtitle1" sx={theme.typography.montserratFont}>
        Debe seleccionar al menos un servicio para poder continuar!
      </Typography>
      {services &&
        services.map((group) => (
          <div key={group.id}>
            <Typography variant="h6">{group.title}</Typography>
            <FormGroup>
              <Stack direction="row">
                {group.services.map((service) => (
                  <FormControlLabel
                    key={service.id}
                    control={
                      <Checkbox
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
          </div>
        ))}
    </ThemeProvider>
  );
}
