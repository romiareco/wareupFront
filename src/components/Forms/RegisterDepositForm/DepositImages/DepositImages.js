import React, { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DepositImageCarousel } from "../../../Carousel/DepositImageCarousel";
import { Stack, Box, ThemeProvider, Button } from "@mui/material";
import { Deposit } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { NotificationSnackbar } from "../../../Snackbar";
import theme from "../../../../theme/theme";
import { LoadingButton } from "@mui/lab";

const depositController = new Deposit();

export function DepositImages({ deposit }) {
  const { accessToken } = useAuth();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
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
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
        setLoading(false);
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
        <Stack direction={"row"} gap={2}>
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
          <LoadingButton
            variant="outlined"
            disabled={!selectedFiles.length}
            onClick={handleUpload}
            loading={loading}
          >
            Subir
          </LoadingButton>
        </Stack>
        <Box>
          {selectedFiles.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </Box>
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
