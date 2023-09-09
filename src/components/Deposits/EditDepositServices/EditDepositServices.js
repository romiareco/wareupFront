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
} from "@mui/material";
import theme from "../../../theme/theme";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { NotificationSnackbar } from "../../NotificationSnackbar";

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
          accessToken
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
  }, [accessToken, deposit.depositServices]);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="subtitle1" sx={theme.typography.montserratFont}>
        Debe seleccionar al menos un servicio!
      </Typography>
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
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={selectedServices.length === 0}
            >
              Guardar cambios
            </Button>
          )}
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
