import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DepositImageCarousel } from "../../../Carousel/DepositImageCarousel";
import { Stack, Box, ThemeProvider, Typography } from "@mui/material";
import { Deposit } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { NotificationSnackbar } from "../../../NotificationSnackbar";
import theme from "../../../../theme/theme";

const depositController = new Deposit();

export function DepositImages({ depositCreated }) {
  const { accessToken } = useAuth();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);

  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationSeverity, setNotificationSeverity] =
    React.useState("success");

  const handleFileChange = (event) => {
    const selectedFilesArray = Array.from(event.target.files);
    setSelectedFiles(selectedFilesArray);

    // Convertir las imágenes a base64
    const convertedFiles = [];

    selectedFilesArray.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const convertedFile = e.target.result;

        convertedFiles.push(convertedFile);

        if (convertedFiles.length === selectedFilesArray.length) {
          setConvertedImages(convertedFiles);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUpload = () => {
    (async () => {
      try {
        if (convertedImages) {
          await depositController.addDepositImages(
            accessToken,
            depositCreated,
            convertedImages
          );

          setNotificationMessage("Depósito registrado exitosamente");
          setNotificationSeverity("success");
          setNotificationOpen(true);
        }
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" sx={theme.typography.montserratFont}>
        Gestión de imágenes para depósitos
      </Typography>
      <Box
        justifyContent="center"
        alignItems="center"
        flexDirection="row" // Alinear los elementos horizontalmente
      >
        <DepositImageCarousel depositId={depositCreated} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row" // Alinear los elementos horizontalmente
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          id="image-input"
          multiple
        />
        <label htmlFor="image-input">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Seleccionar imágenes
          </Button>
        </label>
        <div>
          {selectedFiles.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </div>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!selectedFiles.length}
          onClick={handleUpload}
          style={{ marginLeft: "10px" }} // Agregar espacio a la izquierda del botón
        >
          Subir imágenes
        </Button>
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
