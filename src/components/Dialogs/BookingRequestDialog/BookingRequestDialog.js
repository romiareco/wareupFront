import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../../hooks";
import { useState } from "react";
import { DepositDatePicker } from "../../DatePickers/DepositDatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import { BookingRequest } from "../../../api";
import { ErrorDialog } from "../ErrorDialog";
import dayjs from "dayjs";
import theme from "../../../theme/theme";
import { CustomTransition } from "../CustomTransition";

export function BookingRequestDialog({
  open,
  handleClose,
  depositId,
  maxTotalM3,
}) {
  const { accessToken, user } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // 'success' or 'error'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs()); // Inicializa con la fecha por defecto
  const [endDate, setEndDate] = useState(dayjs()); // Inicializa con la fecha por defecto

  const validationSchema = Yup.object({
    totalM3: Yup.number()
      .required("El campo es obligatorio")
      .min(1, "El valor debe ser mayor a 0")
      .max(maxTotalM3, `El valor debe ser menor o igual a ${maxTotalM3}`), // Agrega esta línea
  });

  const handleErrorDialogOpenChange = (isOpen) => {
    setIsDialogOpen(isOpen);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const formik = useFormik({
    initialValues: {
      totalM3: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (user) {
          const bookingRequestController = new BookingRequest();

          const data = {
            userId: user.id,
            depositId: depositId,
            totalM3: values.totalM3,
            dateFrom: startDate,
            dateTo: endDate,
          };

          await bookingRequestController.registerBookingRequest(
            accessToken,
            data
          );

          setNotificationMessage("Reserva realizada exitosamente");
          setNotificationSeverity("success");
          setNotificationOpen(true);

          handleClose();
        } else {
          setIsDialogOpen(true);
        }
      } catch (error) {
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
      setSubmitting(false);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={CustomTransition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth={"sm"}
      >
        {isDialogOpen && (
          <ErrorDialog
            errorMessage={"Debe iniciar sesión para realizar esta operación."}
            openDialog={isDialogOpen}
            onDialogOpenChange={handleErrorDialogOpenChange}
          />
        )}
        <Stack direction="row" alignItems="center" marginRight={1}>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            ¿Desea realizar una solicitud de reserva?
          </DialogTitle>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <DialogContent>
          <Stack direction={"column"}>
            <Box>
              <DepositDatePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
              />
            </Box>
            <Box
              marginTop={2}
              width={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                type="number"
                required
                name="totalM3"
                label="Espacio a arrendar"
                variant="outlined"
                value={formik.values.totalM3}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.totalM3 && formik.errors.totalM3)}
                helperText={formik.touched.totalM3 && formik.errors.totalM3}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m³</InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="medium"
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Confirmar
            </Button>
          </Box>
        </DialogActions>
        <NotificationSnackbar
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          severity={notificationSeverity}
          message={notificationMessage}
        />
      </Dialog>
    </ThemeProvider>
  );
}
