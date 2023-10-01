import React, { useEffect, useState } from "react";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "semantic-ui-react";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { BookingRequestDialog } from "../Dialogs/BookingRequestDialog/BookingRequestDialog";
import { depositStatus } from "../../utils";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
const depositController = new Deposit();

export function Description({ depositId }) {
  const { accessToken } = useAuth();
  const [deposit, setDeposit] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      {deposit.city && deposit.city.department && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnRoundedIcon
            sx={{ fontSize: "1.2rem", marginRight: "4px" }}
          />
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              fontSize: "0.9rem",
              marginRight: "4px",
              fontWeight: "bold",
            }}
          >
            {deposit.city.title} - {deposit.city.department.title}
          </Typography>
        </Box>
      )}
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
      <div className="cuadro">
        <p>
          Período mínimo de arrendamiento:{" "}
          <strong>{deposit.minimumBusinessPeriod} días </strong>
        </p>
        <p>
          Volumen mínimo de arrendamiento:{" "}
          <strong>{deposit.minimumBusinessVolume} m³ </strong>
        </p>
      </div>

      <Box className="buttons">
        <Button
          className="booking-request"
          onClick={handleClickOpen}
          disabled={deposit.status === depositStatus.DELETED}
        >
          {deposit.status === depositStatus.DELETED ? (
            <>
              <DoDisturbAltRoundedIcon />
              Publicación pausada
            </>
          ) : (
            <>
              <EventAvailableRoundedIcon />
              Solicitar arrendamiento
            </>
          )}
        </Button>
      </Box>
      <BookingRequestDialog
        open={open}
        handleClose={handleClose}
        depositId={deposit.id}
        maxTotalM3={deposit.totalM3}
      />
    </Box>
  );
}
