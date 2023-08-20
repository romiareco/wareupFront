import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Box } from "@mui/material";

import "./style/Settings.scss";
import { Settings, DefaultSettingsT } from "./Settings";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";

const depositController = new Deposit();

export function DepositImageCarousel({ depositId }) {
  const { accessToken } = useAuth();
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await depositController.getDepositImages(
        accessToken,
        depositId
      );
      setImages(response.depositImages);
    })();
  }, [accessToken, depositId]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          marginTop: "50px",
          color: "#494949",
        }}
      >
        <Typography sx={theme.typography.montserratFont}>
          Imágenes actuales del depósito
        </Typography>
        <Carousel className="DepositImageCarousel">
          {images.length === 0 ? (
            <Typography>
              No se registraron imágenes para este depósito
            </Typography>
          ) : (
            images.map((image) => {
              return <Project item={image} key={image.id} />;
            })
          )}
        </Carousel>
      </Box>
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
