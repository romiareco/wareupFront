import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Box } from "@mui/material";
import "./style/Settings.scss";
import { NotificationSnackbar } from "../NotificationSnackbar";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";

const depositController = new Deposit();

export function DepositImageCarousel({ depositId }) {
  const { accessToken } = useAuth();
  const [images, setImages] = useState([]);

  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationSeverity, setNotificationSeverity] =
    React.useState("success");

  useEffect(() => {
    (async () => {
      try {
        const response = await depositController.getDepositImages(
          accessToken,
          depositId
        );
        setImages(response.depositImages);
      } catch (error) {
        console.log(error.message);
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [accessToken, depositId]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          color: "#494949",
        }}
      >
        <Carousel>
          {images.length === 0 ? (
           
              <Typography sx={theme.typography.montserratFont}>
                No se han agregado imágenes aún..
              </Typography>
          ) : (
            images.map((image) => {
              return <Project item={image} key={image.id} />;
            })
          )}
        </Carousel>
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

export function Project({ item }) {
  return (
    <Paper className="Project" elevation={10}>
      <img
        src={`data:image/png;base64,${item.image}`}
        alt={`Imagen ${item.id}`}
        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
      />
    </Paper>
  );
}

export function Base64ToImage({ base64 }) {
  return <img src={`data:image/png;base64,${base64}`} alt="Imagen" />;
}
