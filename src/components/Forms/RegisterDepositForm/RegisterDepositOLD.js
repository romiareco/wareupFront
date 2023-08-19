import { Box } from "@mui/system";
import { BasicDepositData } from "./BasicDepositData";
import { RegisterDepositServices } from "./RegisterDepositServices";
import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { ColorlibConnector, ColorlibStepIcon } from "./RegisterDeposit.design";
import { Storage } from "../../../api";
import { useAuth } from "../../../hooks";

const steps = [
  "Datos básicos del depósito",
  "Agregar servicios",
  "Agregar disponibilidad",
];

const depositController = new Storage();

export function RegisterDeposit() {
  const { accessToken, user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [basicDepositData, setBasicDepositData] = useState({});
  const [registerDepositServices, setRegisterDepositServices] = useState({});
  const handleFormSubmit = () => {
    // ... lógica para manejar la sumisión del formulario completo ...
  };
  
  const basicDepositDataFormik = useFormik({
    initialValues: basicDepositData,
    onSubmit: (values) => {
      setBasicDepositData(values);
      handleNext();
    },
    // ... otras propiedades de configuración para el formulario
  });

  const registerDepositServicesFormik = useFormik({
    initialValues: registerDepositServices,
    onSubmit: (values) => {
      setRegisterDepositServices(values);
      handleNext();
    },
    // ... otras propiedades de configuración para el formulario
  });
  const handleFinish = () => {
    const combinedValues = {
      ...basicDepositData,
      ...registerDepositServices,
      // ... otros valores combinados de otros formularios si es necesario
    };

    formik.handleSubmit(combinedValues); // Ejecutar el onSubmit de Formik
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formik = useFormik({
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await depositController.register(accessToken, user, formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicDepositData onNext={handleNext} />;
      case 1:
        return <RegisterDepositServices onSubmit={handleFormSubmit} />;
      case 2:
        //TODO: pendiente definir el form de disponibilidad
        console.log("hola");
      default:
        return null;
    }
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
      <div>{getStepContent(activeStep)}</div>
      {activeStep === steps.length ? (
        <div>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </div>
      ) : (
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      )}
    </Box>
  );
}
