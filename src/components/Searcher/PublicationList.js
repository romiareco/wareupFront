import {
  Box,
  Typography,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  TablePagination,
  CircularProgress,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { NotificationSnackbar } from "../NotificationSnackbar";
import { motion } from "framer-motion";
import theme from "../../theme/theme";

export function PublicationList({
  publications,
  notificationMessage,
  notificationOpen,
  notificationSeverity,
  handleIsNotificationOpen,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleOpenPublication = (deposit) => {
    const queryParams = {
      id: deposit.id,
    };

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    const url = `publication-view?${queryString}`;

    window.open(url, "_blank");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      {publications.length === 0 ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "2px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" sx={theme.typography.montserratFont}>
            Se encontraron{" "}
            <span style={{ fontWeight: "bold" }}>{publications.length}</span>{" "}
            publicaciones en base a su búsqueda
          </Typography>
          <Grid container spacing={4}>
            {publications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((publication) => (
                <Grid item key={publication.id} md={4} sx={{ display: "flex" }}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    style={{ width: "100%" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        padding: "8px", // Reducir el espaciado interno
                      }}
                    >
                      <CardActionArea
                        onClick={() => handleOpenPublication(publication)}
                      >
                        <CardMedia
                          component="div"
                          sx={{
                            pt: "50%",
                            display: "flex",
                            justifyContent: "flex-end", // Alinea el contenido a la derecha
                            alignItems: "center",
                            maxWidth: "100%", // Ajustar el ancho de la imagen
                            // Alinea verticalmente al centro
                          }}
                          image={publication.depositImage}
                        >
                          <Stack
                            direction={"row"}
                            marginRight={1}
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo opaco
                              padding: "4px 8px", // Ajusta el espaciado interno según tus preferencias
                              borderRadius: "4px", // Bordes redondeados
                            }}
                            marginBottom={1}
                          >
                            <Typography
                              variant="h6"
                              marginRight={1}
                              fontWeight="bold"
                            >
                              {publication.currency}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                              {publication.price}
                            </Typography>
                          </Stack>
                        </CardMedia>
                        <CardContent
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "8px", // Reducir el espaciado interno
                          }}
                        >
                          <Typography gutterBottom variant="h6" component="h2">
                            {publication.title}
                          </Typography>
                          <Typography variant="body2">
                            {publication.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      <Box sx={{ marginTop: 2 }}>
        {publications.length > 6 && (
          <TablePagination
            rowsPerPageOptions={[6, 12, 18]}
            component="div"
            count={publications === null ? 0 : publications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Publicaciones por página:"
          />
        )}
      </Box>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => handleIsNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
