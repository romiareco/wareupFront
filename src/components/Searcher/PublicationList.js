import {
  Box,
  Typography,
  Container,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Deposit } from "../../api";
import { useAuth } from "../../hooks";
import { NotificationSnackbar } from "../NotificationSnackbar";
import { RepeatOneSharp } from "@mui/icons-material";
import { mapBase64ToImage } from "../../utils/mapFunctions";
import noImage from "../../assets/deposit-images/sinimagen.jpg";

const depositController = new Deposit();

export function PublicationList() {
  const { accessToken } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [publications, setPublications] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [depositImages, setDepositImages] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await depositController.getAllDeposits(accessToken);
        setDeposits(response.deposits);

        if (response.deposits.length > 0) {
          const depositPublications = [];

          for (const deposit of response.deposits) {
            const id = deposit.id;
            const title = deposit.title;
            const description = deposit.description;
            let depositImage;

            const images = await depositController.getDepositImages(
              accessToken,
              id
            );

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
          setPublications(depositPublications);
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [accessToken]);

  return (
    <Box>
      <Typography>Depósitos disponibles</Typography>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {publications
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((publication) => (
              <Grid item key={publication.id} md={4} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1, // Hace que la tarjeta ocupe todo el espacio
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      //image="https://source.unsplash.com/random?wallpapers"
                                            image={publication.depositImage}

                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between", // Distribuir el contenido verticalmente
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        {publication.title}
                      </Typography>
                      <Typography>{publication.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
      <TablePagination
        rowsPerPageOptions={[6, 12, 18]}
        component="div"
        count={publications === null ? 0 : publications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Publicaciones por página:" // Personaliza el texto aquí
      />
    </Box>
  );
}
