import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DepositImageCarousel } from "../../../Carousel/DepositImageCarousel";
import { Stack, Box, ThemeProvider, Typography } from "@mui/material";
import { Deposit } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { NotificationSnackbar } from "../../../NotificationSnackbar";
import theme from "../../../../theme/theme";
import { Grid } from "@mui/material";

const depositController = new Deposit();

export function DepositImages({ deposit }) {
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

    const convertedFiles = [];

    selectedFilesArray.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const convertedFile = e.target.result;

        const base64Data = convertedFile.split(",")[1];
        convertedFiles.push(base64Data);

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
            deposit.id,
            convertedImages
          );

          setNotificationMessage(
            "Se han agregado imágenes al depósito exitosamente"
          );
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
      <Box>
        <DepositImageCarousel depositId={deposit.id} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={2}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          id="image-input"
          multiple
        />
        <Grid container spacing={1} alignItems="center">
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              disabled={!selectedFiles.length}
              onClick={handleUpload}
            >
              Subir imágenes
            </Button>
          </Grid>
        </Grid>
        <div>
          {selectedFiles.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </div>
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
