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

const steps = [
  "Agregar información del depósito",
  "Agregar servicios"
];

//TODO: pendiente agregar paso  "Agregar disponibilidad"

export function RegisterDeposit() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({}); // Almacena la información de todos los pasos
  const [stepData, setStepData] = React.useState({}); // Almacena los datos de cada paso

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
    if (isStepValid(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const isStepValid = (stepIndex) => {
    const stepKey = steps[stepIndex];
    const stepData = formData[stepKey]; // Datos del primer paso

    switch (stepIndex) {
      case 0:
        return (
          stepData &&
          stepData.hasOwnProperty("companyId") &&
          stepData.hasOwnProperty("expectedPrice") &&
          stepData.hasOwnProperty("description") &&
          stepData.hasOwnProperty("cityId") &&
          stepData.hasOwnProperty("departmentId")
        );
      case 1:
        return stepData && stepData.length !== 0;
      default:
        return false;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => {
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
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <BasicDepositData
              formInformation={handleStepSubmit}
              initialValues={stepData[steps[0]] || {}}
            />
          )}
          {activeStep === 1 && (
            <RegisterDepositServices
              formInformation={handleStepSubmit}
            />
          )}
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
            <Button onClick={handleNext} disabled={!isStepValid(activeStep)}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
