import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export function DepositDatePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const handleStartDateChange = (date) => {
    onStartDateChange(date);
    if (date.isAfter(endDate)) {
      onEndDateChange(date);
    }
  };

  const handleEndDateChange = (date) => {
    onEndDateChange(date);
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
            onChange={handleEndDateChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
