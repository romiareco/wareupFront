import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import "./style/Settings.scss";
import { NotificationSnackbar } from "../Snackbar";
import { Deposit } from "../../api";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";

const controller = new Deposit();

export function DepositImageCarousel({ depositId }) {
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationSeverity, setNotificationSeverity] =
    React.useState("success");

  useEffect(() => {
    (async () => {
      try {
        setLoadingImages(true);
        const response = await controller.getDepositImages(depositId);
        setImages(response.depositImages);
        setLoadingImages(false);
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
        setLoadingImages(false);
      }
    })();
  }, [depositId]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {loadingImages ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "6"
            }}
          >
            <CircularProgress />
          </Box>
        ) : images.length === 0 ? (
          <Box marginBottom={6}>
            <Typography>
              No se han agregado imágenes aún..
            </Typography>
          </Box>
        ) : (
          <Carousel
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            {images.map((image) => {
              return <Image item={image} key={image.id} />;
            })}
          </Carousel>
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

export function Image({ item }) {
  return (
    <Paper className="Image" elevation={10}>
      <img
        src={`data:image/png;base64,${item.image}`}
        alt={`Imagen ${item.id}`}
        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
      />
    </Paper>
  );
}
