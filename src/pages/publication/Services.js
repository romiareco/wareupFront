import { useAuth } from "../../hooks";
import React, { useEffect, useState } from "react";
import { Deposit, Service } from "../../api";
import { Typography, FormGroup, Box, Stack } from "@mui/material";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const depositController = new Deposit();
const serviceController = new Service();

export function Services({ depositId }) {
  const [depositServices, setDepositServices] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await serviceController.getAllServices(accessToken);
        setServiceGroups(response.serviceGroups);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, depositId]);

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
      <Typography variant="h4">
        <MiscellaneousServicesRoundedIcon
          style={{ fontSize: "2rem", marginRight: "8px" }}
        />
        Servicios disponibles
      </Typography>
      <Box padding={2}>
        {serviceGroups &&
          serviceGroups.map((group) => {
            // Verificar si depositServices no es null antes de filtrar
            const groupDepositServices =
              depositServices &&
              depositServices.filter(
                (myService) => myService.service.serviceGroupId === group.id
              );

            // Verificar si hay depositServices para este group
            if (groupDepositServices && groupDepositServices.length > 0) {
              return (
                <div key={group.id}>
                  <Typography variant="h5">{group.title}</Typography>
                  <FormGroup>
                    <Stack direction="row" padding={2}>
                      {groupDepositServices.map((myService) => (
                        <div
                          key={myService.service.id}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <CheckRoundedIcon
                            style={{ marginRight: "1px", marginLeft: "20px" }}
                          />{" "}
                          {/* Icono */}
                          <Typography>
                            {myService.service.title}
                          </Typography>{" "}
                          {/* Label del servicio */}
                        </div>
                      ))}
                    </Stack>
                  </FormGroup>
                </div>
              );
            }

            // Si no hay depositServices para este group, no se renderiza nada
            return null;
          })}
      </Box>
    </Box>
  );
}
