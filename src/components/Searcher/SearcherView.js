import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  ThemeProvider,
} from "@mui/material";
import theme from "../../theme/theme";
import { TopHomeBar } from "../Home";
import { QuickSearcher } from "./QuickSearcher";
import { DepositsSearch } from "./DepositsSearch";
import { Footer } from "../Footer";
import { DepositsMap } from "../Maps";
import { useEffect, useState } from "react";
import { Deposit } from "../../api";
import { NotificationSnackbar } from "../NotificationSnackbar";

const depositController = new Deposit();

export function SearcherView({ filters }) {
  const [isLoading, setIsLoading] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [deposits, setDeposits] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await depositController.getAllDeposits(filters);
        setDeposits(response.deposits);
        setIsLoading(false);
        setDataLoaded(true); // Marcar los datos como cargados
      };

      fetchData();
    } catch (error) {
      console.error(error);
      setNotificationMessage(error);
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setIsLoading(false);
    }
  }, [filters]);

  // Solo renderiza el contenido cuando los datos están cargados
  if (!dataLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <TopHomeBar />
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <QuickSearcher />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px", // Ajusta la altura según tus necesidades
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <TopHomeBar />
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <QuickSearcher />
      </Box>
      <Stack direction={"row"} marginLeft={4} marginRight={4}>
        <Grid container spacing={2}>
          <Grid item  md={6}>
            <Box>
              <DepositsSearch setIsLoading={setIsLoading} deposits={deposits} />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box>
              <DepositsMap filters={filters} deposits={deposits} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Footer />
      {isLoading && ( // Muestra CircularProgress mientras isLoading es true
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 9999, // Asegura que esté por encima de otros elementos
          }}
        >
          <CircularProgress />
        </Box>
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
