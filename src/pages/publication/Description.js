import React, { useEffect, useState } from "react";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "semantic-ui-react";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const depositController = new Deposit();

export function Description({ depositId }) {
  const { accessToken } = useAuth();

  const [deposit, setDeposit] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await depositController.getDepositById(
          accessToken,
          depositId
        );
        setDeposit(response.deposit);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, depositId]);

  if (deposit === null) {
    return <Typography>No se encontró la información del depósito.</Typography>;
  }

  return (
    <Box className="description">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LocationOnRoundedIcon
          sx={{ fontSize: "1.2rem", marginRight: "4px" }}
        />
        <Typography
          variant="body1"
          sx={{
            textTransform: "uppercase",
            fontSize: "0.9rem", // Ajusta el tamaño de fuente según tu preferencia
            marginRight: "4px", // Espacio entre el icono y el texto
            fontWeight: "bold", // Puede ajustarse según tus preferencias
          }}
        >
          {deposit.city.title} - {deposit.city.departmentId}
        </Typography>
      </Box>
      <Typography className="pre">{deposit.company.businessName}</Typography>
      <h1>{deposit.title}</h1>
      <Box className="price">
        <Box className="main-tag">
          <p>{deposit.totalM3} m³</p>
        </Box>
      </Box>
      <p className="desc">{deposit.description}</p>

      <Box className="price">
        <Box className="main-tag">
          <p>
            {deposit.currency} {deposit.expectedPrice}
          </p>
        </Box>
      </Box>

      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DemoItem label="Desde">
              <DatePicker disablePast defaultValue={dayjs()} />
            </DemoItem>
            <DemoItem label="Hasta">
              <DatePicker disablePast  defaultValue={dayjs()} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <Box className="buttons">
        <Button className="add-to-cart" onClick={() => {}}>
          <EventAvailableRoundedIcon />
          Comprobar disponibilidad
        </Button>
      </Box>
    </Box>
  );
}
