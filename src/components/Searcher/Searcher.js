import { useEffect, useState } from "react";
import { PublicationList } from "./PublicationList";
import { Deposit } from "../../api";
import { mapBase64ToImage } from "../../utils/mapFunctions";
import noImage from "../../assets/deposit-images/sinimagen.jpg";
import { Container, Typography } from "@mui/material";
import { NotificationSnackbar } from "../NotificationSnackbar";

const depositController = new Deposit();

export function Searcher({ filters }) {
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
        const response = await depositController.getAllDeposits(filters);
        if (response.deposits.length > 0) {
          const depositPublications = [];

          for (const deposit of response.deposits) {
            const id = deposit.id;
            const title = deposit.title;
            const description = deposit.description;
            let depositImage;

            const images = await depositController.getDepositImages(id);

            if (images.depositImages.length > 0) {
              const firstImage = images.depositImages[0];

              depositImage = mapBase64ToImage(firstImage["image"]);
            } else {
              depositImage = noImage;
            }

            const depositPublication = {
              id,
              title,
              description,
              depositImage,
            };

            depositPublications.push(depositPublication);
          }
          setFilterPublications(depositPublications);
        } else {
          setEmptyResult(true);
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [filters]);

  return (
    <Container>
      {emptyResult ? (
        <Typography variant="h5">
          No se encontraron resultados para su búsqueda.
        </Typography>
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
    </Container>
  );
}
