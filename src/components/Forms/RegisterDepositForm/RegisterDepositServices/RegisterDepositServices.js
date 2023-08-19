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

const serviceController = new Service();

export function RegisterDepositServices() {
  const { accessToken } = useAuth();

  const [services, setServices] = React.useState([]);

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
    <div>
      {services.map((group) => (
        <div key={group.id}>
          <Typography variant="h6">{group.title}</Typography>
          <FormGroup>
            <Stack direction="row">
              {group.services.map((service) => (
                <FormControlLabel
                  key={service.id}
                  control={<Checkbox />}
                  label={service.title}
                />
              ))}
            </Stack>
          </FormGroup>
        </div>
      ))}
    </div>
  );
}
