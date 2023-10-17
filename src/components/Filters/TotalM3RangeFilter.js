import React, { useEffect, useState } from "react";
import { Typography, Slider, Stack, TextField, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export function TotalM3RangeFilter({ onTotalM3RangeChange }) {
  const [totalM3Range, setTotalM3Range] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setTotalM3Range(newValue);
  };

  useEffect(() => {
    onTotalM3RangeChange(totalM3Range);
  }, [totalM3Range, onTotalM3RangeChange]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Total de m³
      </Typography>
      <Typography variant="body" gutterBottom>
        Ingrese el rango de m³ que desea visualizar en su búsqueda.
      </Typography>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Slider
          value={totalM3Range}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ width: "90%" }}
        />
      </Box>
      <Stack
        direction="row"
        spacing={4}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <TextField
          label="Desde"
          type="number"
          value={totalM3Range[0]}
          onChange={(e) => setTotalM3Range([+e.target.value, totalM3Range[1]])}
          inputProps={{ min: 0, max: totalM3Range[1] - 1 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m³</InputAdornment>,
          }}
        />
        <TextField
          label="Hasta"
          type="number"
          value={totalM3Range[1]}
          onChange={(e) => setTotalM3Range([totalM3Range[0], +e.target.value])}
          inputProps={{ min: totalM3Range[0] + 1, max: 1000 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">m³</InputAdornment>,
          }}
        />
      </Stack>
    </Stack>
  );
}
