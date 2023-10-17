import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ColorlibConnector, ColorlibStepIcon } from "./RegisterDeposit.design";
import { BasicDepositData } from "./BasicDepositData";
import { RegisterDepositServices } from "./RegisterDepositServices";
import theme from "../../../theme/theme";
import { ComplexButton } from "../../Button";
import { Deposit } from "../../../api";
import depositImages from "../../../assets/official-images/f683361f-8860-4902-b8ee-2331a81f03c2.jpg";
import addAvailability from "../../../assets/button-images/add-availability.jpg";

import CircularProgress from "@mui/material/CircularProgress";
import {
  buildStructuredBodyData,
  isLastStep,
  isStepValid,
} from "./RegisterDeposit.utils";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../Snackbar";
import { ThemeProvider } from "@emotion/react";
import {
  AddDepositAvailabilityDialog,
  AddDepositImageDialog,
} from "../../Dialogs";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ["Agregar información del depósito", "Agregar servicios"];

const depositController = new Deposit();

export function RegisterDeposit() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [stepData, setStepData] = React.useState({});
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationSeverity, setNotificationSeverity] =
    React.useState("success");
  const [depositCreated, setDepositCreated] = React.useState(0);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [isAddAvailabilityDialogOpen, setIsAddAvailabilityDialogOpen] =
    React.useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = React.useState(false);

  const handleAddAvailability = () => {
    setIsAddAvailabilityDialogOpen(true);
    setIsAddImageDialogOpen(false);
  };

  const handleAddImage = () => {
    setIsAddImageDialogOpen(true);
    setIsAddAvailabilityDialogOpen(false);
  };

  const handleAddImageDialogOpenChange = (isOpen) => {
    setIsAddImageDialogOpen(isOpen);
  };

  const handleAddAvailabilityDialogOpenChange = (isOpen) => {
    setIsAddAvailabilityDialogOpen(isOpen);
  };

  const handleFormSubmit = () => {
    const data = buildStructuredBodyData(steps, formData);
    (async () => {
      try {
        setIsRegistering(true);

        const response = await depositController.register(accessToken, data);

        setNotificationMessage("Depósito registrado exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        setDepositCreated(response.deposit);

        window.gtag("event", "register", {
          event_category: "Registrations",
          event_label: "Deposit registration",
        });

        setIsRegistering(false);
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);

        setIsRegistering(false);
      }
    })();
  };

  const handleStepSubmit = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [steps[activeStep]]: data,
    }));
    setStepData((prevStepData) => ({
      ...prevStepData,
      [steps[activeStep]]: data,
    }));
  };

  const handleNext = () => {
    if (isStepValid(activeStep, steps, formData)) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);

      if (isLastStep(nextStep, steps)) {
        handleFormSubmit();
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicDepositData
            formInformation={handleStepSubmit}
            initialValues={stepData[steps[0]] || {}}
          />
        );
      case 1:
        return <RegisterDepositServices formInformation={handleStepSubmit} />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingLeft: "4%",
          paddingRight: "4%",
          backgroundColor: "rgba(242, 242, 242, 0.9)",
          padding: "20px",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" paddingTop={2} marginBottom={2}>
          Registro de nuevo depósito
        </Typography>

        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ paddingBottom: "20px" }}
        >
          {steps.map((label) => {
            const stepProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {isLastStep(activeStep, steps) ? (
          <React.Fragment>
            {isRegistering ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                marginBottom={4}
              >
                <CircularProgress size={50} />
                <Typography textAlign={"center"}>
                  Registrando depósito...
                </Typography>
              </Box>
            ) : (
              <React.Fragment>
                {depositCreated !== 0 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography
                      textAlign={"center"}
                      variant="h6"
                      marginBottom={3}
                    >
                      ¡Un paso más! ¿Te gustaría registrar las imágenes del
                      depósito?
                    </Typography>

                    <Stack direction={"row"} marginBottom={3}>
                      <Box>
                        <ComplexButton
                          imageTitle={"AGREGAR IMÁGENES"}
                          imageUrl={depositImages}
                          imageWidth={"500px"}
                          onClick={() => handleAddImage()}
                          deposit={depositCreated}
                        />
                      </Box>
                      <Box>
                        <ComplexButton
                          imageTitle={"AGREGAR DISPONIBILIDAD"}
                          imageUrl={addAvailability}
                          imageWidth={"500px"}
                          onClick={() => handleAddAvailability()}
                          deposit={depositCreated}
                        />
                      </Box>
                    </Stack>

                    <Box>
                      <Button variant="contained" onClick={handleFinish}>
                        Finalizar registro
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginBottom={3}
                  >
                    <Typography textAlign={"center"}>
                      Parece que hubo un error. Sugerimos realizar el registro
                      nuevamente
                    </Typography>
                  </Box>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>{getStepContent(activeStep)}</div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="outlined"
                size="medium"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="outlined"
                size="medium"
                onClick={handleNext}
                disabled={
                  !isStepValid(activeStep, steps, formData) || isRegistering
                }
              >
                {isRegistering ? (
                  <CircularProgress size={24} />
                ) : activeStep === steps.length - 1 ? (
                  "Finalizar"
                ) : (
                  "Siguiente"
                )}
              </Button>
            </Box>
          </React.Fragment>
        )}
        <AddDepositImageDialog
          selectedDeposit={depositCreated}
          openDialog={isAddImageDialogOpen}
          onDialogOpenChange={handleAddImageDialogOpenChange}
        />
        <AddDepositAvailabilityDialog
          selectedDeposit={depositCreated}
          openDialog={isAddAvailabilityDialogOpen}
          onDialogOpenChange={handleAddAvailabilityDialogOpenChange}
        />
        <NotificationSnackbar
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          severity={notificationSeverity}
          message={notificationMessage}
        />
      </Box>
    </ThemeProvider>
  );
}
