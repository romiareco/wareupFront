import React, { useState, useEffect } from "react";
import { Deposit, Service } from "../../../api";
import { useAuth } from "../../../hooks";
import { ThemeProvider } from "@emotion/react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  Popover,
  Grid,
  Divider,
} from "@mui/material";
import theme from "../../../theme/theme";
import CircularProgress from "@mui/material/CircularProgress";
import { NotificationSnackbar } from "../../Snackbar";
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loadingServices, setLoadingServices] = useState(true);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
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
        setLoadingServices(true);
        const servicesResponse = await serviceController.getAllServices();

        setServices(servicesResponse.serviceGroups);

        if (deposit.depositServices) {
          setSelectedServices(
            deposit.depositServices.map((item) => item.serviceId)
          );
        }
        setLoadingServices(false);
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
        setLoadingServices(false);
      }
    })();
  }, [deposit.depositServices]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {loadingServices ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          services &&
          services.map((group, index) => (
            <div key={group.id}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                }}
                gutterBottom
              >
                {group.title}
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  {group.services.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                      <FormControlLabel
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
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
              {index < services.length - 1 && <Divider variant="middle" />}
            </div>
          ))
        )}
        {!loadingServices && (
          <Box mt={2} display="flex" justifyContent="center">
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              disabled={selectedServices.length === 0}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              loading={loading}
            >
              Guardar cambios
            </LoadingButton>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={selectedServices.length === 0} // Abre el Popover si el botón está deshabilitado o no se han seleccionado servicios
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>
                Debe seleccionar al menos un servicio.
              </Typography>
            </Popover>
          </Box>
        )}
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
