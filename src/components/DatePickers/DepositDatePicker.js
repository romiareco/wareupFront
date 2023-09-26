import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export function DepositDatePicker({ onDateChange }) {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date.isAfter(endDate)) {
      setEndDate(date);
    }

    onDateChange(startDate, endDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem label="Desde">
          <DatePicker
            disablePast
            defaultValue={dayjs()}
            value={startDate}
            onChange={handleStartDateChange}
          />
        </DemoItem>
        <DemoItem label="Hasta">
          <DatePicker
            disablePast
            defaultValue={dayjs()}
            value={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
