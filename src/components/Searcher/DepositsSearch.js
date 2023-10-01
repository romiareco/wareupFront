import { useEffect, useState } from "react";
import { PublicationList } from "./PublicationList";
import { Deposit } from "../../api";
import { mapBase64ToImage } from "../../utils/mapFunctions";
import noImage from "../../assets/deposit-images/sinimagen.jpg";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { NotificationSnackbar } from "../NotificationSnackbar";
import theme from "../../theme/theme";

const depositController = new Deposit();

export function DepositsSearch({ setIsLoading, deposits }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [filterPublications, setFilterPublications] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);

  const handleIsNotificationOpen = (isOpen) => {
    setNotificationOpen(isOpen);
  };

  useEffect(() => {
    (async () => {
      try {
        if (deposits.length > 0) {
          const depositPublications = [];

          for (const deposit of deposits) {
            let depositImage;

            const images = await depositController.getDepositImages(deposit.id);

            if (images.depositImages.length > 0) {
              const firstImage = images.depositImages[0];

              depositImage = mapBase64ToImage(firstImage["image"]);
            } else {
              depositImage = noImage;
            }

            const depositPublication = {
              id: deposit.id,
              title: deposit.title,
              description: deposit.description,
              price: deposit.expectedPrice,
              currency: deposit.currency,
              depositImage,
            };

            depositPublications.push(depositPublication);
          }
          setFilterPublications(depositPublications);
          setEmptyResult(false);
        } else {
          setEmptyResult(true);
          setFilterPublications([]);
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setIsLoading, deposits]);

  return (
    <ThemeProvider theme={theme}>
      {emptyResult ? (
        <Box>
          <Typography variant="h6">
            No se encontraron resultados para su búsqueda.
          </Typography>
        </Box>
      ) : (
        <PublicationList
          publications={filterPublications}
          notificationMessage={notificationMessage}
          notificationOpen={notificationOpen}
          notificationSeverity={notificationSeverity}
          handleIsNotificationOpen={handleIsNotificationOpen}
        />
      )}
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
