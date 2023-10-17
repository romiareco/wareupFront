import { Checkbox, FormControlLabel, Grid } from "@mui/material";

export function ServiceCheckbox({
  service,
  selectedServices,
  handleServiceToggle,
}) {
  const isChecked = selectedServices.includes(service.id);

  const handleChange = () => {
    handleServiceToggle(service.id);
  };

  return (
    <Grid item xs={6}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            color="success"
            onChange={handleChange}
            name={service.title}
          />
        }
        label={service.title}
      />
    </Grid>
  );
}
