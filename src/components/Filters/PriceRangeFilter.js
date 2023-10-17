import React, { useEffect, useState } from "react";
import { Typography, Slider, Stack, TextField, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export function PriceRangeFilter({ onPriceRangeChange }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    onPriceRangeChange(priceRange);
  }, [priceRange, onPriceRangeChange]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Rango de precios
      </Typography>
      <Typography variant="body" gutterBottom>
        Los precios se encuentran en dólares estadounidenses
      </Typography>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Slider
          value={priceRange}
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
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          inputProps={{ min: 0, max: priceRange[1] - 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Hasta"
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          inputProps={{ min: priceRange[0] + 1, max: 1000 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Stack>
    </Stack>
  );
}
