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
import { DepositImages } from "./DepositImages";
import theme from "../../../theme/theme";
import { ComplexButton } from "../../Button";
import { Deposit, Storage } from "../../../api";
import depositImages from "../../../assets/official-images/f683361f-8860-4902-b8ee-2331a81f03c2.jpg";

import {
  buildStructuredBodyData,
  isLastStep,
  isStepValid,
} from "./RegisterDeposit.utils";
import { useAuth } from "../../../hooks";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { AddDepositImageDialog, AddDespositImage } from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";

const steps = [
  "Agregar información del depósito",
  "Agregar servicios",
  "Agregar disponibilidad",
];

//TODO: pendiente agregar paso  "Agregar disponibilidad"

const storageController = new Deposit();

export function RegisterDeposit() {
  const { accessToken } = useAuth();

  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({}); // Almacena la información de todos los pasos
  const [stepData, setStepData] = React.useState({}); // Almacena los datos de cada paso
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = React.useState(false);

  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationSeverity, setNotificationSeverity] =
    React.useState("success");
  const [depositCreated, setDepositCreated] = React.useState({});
  const [showDepositImages, setShowDepositImages] = React.useState(false);

  const handleAddDepositImage = () => {
    return (
      <DepositImages depositCreated={depositCreated} />
     );
  };

  const handleFormSubmit = () => {
    const data = buildStructuredBodyData(steps, formData);
    (async () => {
      try {
        const response = await storageController.register(accessToken, data);

        setNotificationMessage("Depósito registrado exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        setDepositCreated(response.deposit);
        setIsAddImageDialogOpen(true);
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
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
      case 2:
        //TODO: pendiente definir el form de disponibilidad
        return <Typography>Hola!</Typography>;
      default:
        return null;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ paddingBottom: "20px" }} // Agrega el padding inferior deseado
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
            {depositCreated !== "" ? (
              <Typography
                textAlign={"center"}
                sx={theme.typography.montserratFont}
              >
                ¡Un paso más! ¿Te gustaría registrar las imágenes del depósito?{" "}
                <ComplexButton
                  imageTitle={"AGREGAR IMÁGENES"}
                  imageUrl={depositImages}
                  imageWidth={"500px"}
                  onClick={handleAddDepositImage}
                />
              </Typography>
            ) : (
              "Parece que hubo un error"
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>{getStepContent(activeStep)}</div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                disabled={!isStepValid(activeStep, steps, formData)}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
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
