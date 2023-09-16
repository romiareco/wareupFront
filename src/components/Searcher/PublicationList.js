import {
  Box,
  Typography,
  Container,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { NotificationSnackbar } from "../NotificationSnackbar";
import { motion } from "framer-motion";

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
    <Container sx={{ py: 8 }}>
      {publications.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
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
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleOpenPublication(publication)}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          pt: "70%",
                        }}
                        image={publication.depositImage}
                      ></CardMedia>
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {publication.title}
                        </Typography>
                        <Typography>{publication.description}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      )}
      <Box sx={{ marginTop: 2 }}>
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
      </Box>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => handleIsNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Container>
  );
}
