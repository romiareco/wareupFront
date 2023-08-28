import { useAuth } from "../../hooks";
import React, { useEffect, useState } from "react";
import { Deposit } from "../../api";
import { Typography, FormGroup, Box, Stack } from "@mui/material";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const depositController = new Deposit();

export function Services({ depositId }) {
  const [depositServices, setDepositServices] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await depositController.getDepositServicesById(
          accessToken,
          depositId
        );
        setDepositServices(response.depositServices);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, depositId]);

  return (
    <Box>
      <Typography variant="h6">
        <MiscellaneousServicesRoundedIcon />
        Servicios disponibles
      </Typography>
      <Box>
        {depositServices &&
          depositServices.map((group) => (
            <div key={group.id}>
              <Typography variant="h6">{group.title}</Typography>
              <FormGroup>
                <Stack direction="row">
                  {group.services.map((service) => (
                    <div
                      key={service.id}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <CheckRoundedIcon style={{ marginRight: "8px" }} />{" "}
                      {/* Icono */}
                      <Typography>{service.title}</Typography>{" "}
                      {/* Label del servicio */}
                    </div>
                  ))}
                </Stack>
              </FormGroup>
            </div>
          ))}
      </Box>
    </Box>
  );
}
