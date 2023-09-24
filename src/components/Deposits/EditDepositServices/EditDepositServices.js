import React, { useState, useEffect } from "react";
import { Deposit, Service } from "../../../api";
import { useAuth } from "../../../hooks";
import { ThemeProvider } from "@emotion/react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Stack,
  Box,
  Button,
  Popover,
} from "@mui/material";
import theme from "../../../theme/theme";
import CircularProgress from "@mui/material/CircularProgress";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { LoadingButton } from "@mui/lab";

const serviceController = new Service();
const depositController = new Deposit();

export function EditDepositServices({ deposit }) {
  const { accessToken } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleMouseEnter = () => {
    if (selectedServices.length === 0) {
      setPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      deposit.servicesId = selectedServices;
      await depositController.updateDeposit(accessToken, deposit);

      setNotificationMessage("Servicios actualizados exitosamente");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setLoading(false);
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const servicesResponse = await serviceController.getAllServices(
          
        );

        setServices(servicesResponse.serviceGroups);

        if (deposit.depositServices) {
          setSelectedServices(
            deposit.depositServices.map((item) => item.serviceId)
          );
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [deposit.depositServices]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
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
                          checked={
                            selectedServices.includes(service.id) // Marcado si se seleccionó manualmente
                          }
                        />
                      }
                      label={service.title}
                    />
                  ))}
                </Stack>
              </FormGroup>
            </div>
          ))}
      </Box>
      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <React.Fragment>
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              disabled={selectedServices.length === 0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Guardar cambios
            </LoadingButton>
            <Popover
              open={popoverOpen}
              anchorEl={null}
              onClose={() => setPopoverOpen(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              style={{ zIndex: 9999 }} // Ajusta el valor según sea necesario
            >
              <Typography sx={{ p: 2 }}>
                Debe seleccionar al menos un servicio.
              </Typography>
            </Popover>
          </Box>
        </React.Fragment>
      </Box>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
