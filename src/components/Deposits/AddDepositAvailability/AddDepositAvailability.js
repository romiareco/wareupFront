import {
  Divider,
  Box,
  Button,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { Deposit } from "../../../api";
import React, { useState } from "react";
import { NotificationSnackbar } from "../../NotificationSnackbar";
import {
  initialValues,
  validationSchema,
} from "../../Forms/Forms/AddDepositAvailability.form";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import theme from "../../../theme/theme";
import { LoadingButton } from "@mui/lab";
const depositController = new Deposit();

export function AddDepositAvailability({ deposit }) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date.isAfter(endDate)) {
      setEndDate(date);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(deposit),
    validationSchema: validationSchema(deposit),
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        formValue.depositId = deposit.id;
        await depositController.registerDepositAvailability(
          accessToken,
          formValue
        );

        setNotificationMessage("Disponibilidad agregada exitosamente");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setLoading(false);
      } catch (error) {
        setNotificationMessage(error.message);
        setNotificationSeverity("error");
        setNotificationOpen(true);
        setLoading(false);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box marginBottom={2}>
        {" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DemoItem label="Desde">
              <DatePicker
                disablePast
                name="startDate"
                value={formik.values.startDate}
                onChange={(date) => {
                  formik.setFieldValue("startDate", date); // Actualiza el valor de startDate en formik.values
                  handleStartDateChange(date); // Llama a tu función handleStartDateChange si es necesario
                }}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="error">{formik.errors.startDate}</div>
              ) : null}
            </DemoItem>
            <DemoItem label="Hasta">
              <DatePicker
                disablePast
                name="endDate"
                value={formik.values.endDate}
                minDate={formik.values.startDate}
                onChange={(date) => {
                  formik.setFieldValue("endDate", date); // Actualiza el valor de endDate en formik.values
                  setEndDate(date); // Actualiza el estado si es necesario
                }}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <div className="error">{formik.errors.endDate}</div>
              ) : null}
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      <Divider />

      <Box marginTop={2}>
        {" "}
        <TextField
          fullWidth
          type="number"
          name="totalM3"
          label="Total metros cúbicos"
          value={formik.values.totalM3}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          variant="outlined"
          required
          error={formik.errors.totalM3}
          helperText={formik.errors.totalM3}
        />
      </Box>

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={formik.handleSubmit}
          size={"medium"}
        >
          Guardar
        </LoadingButton>
      </Box>
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ThemeProvider>
  );
}
