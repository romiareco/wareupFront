import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../theme/theme";
import { AutocompleteSearcher } from "../Autocomplete";
import { Button, CircularProgress, Stack } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { SearchFiltersDialog } from "../Dialogs";

export function QuickSearcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchCity, setSearchCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);

  const getUrlParams = () => {
    const queryParams = new URLSearchParams(location.search);
    const params = {};
    for (const [key, value] of queryParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const handleFiltersChange = (newFilters) => {
    setOpen(false); // Cierra el diálogo después de aplicar los filtros

    const queryParams = new URLSearchParams();

    // Agregar los filtros a los parámetros de consulta
    for (const key in newFilters) {
      if (newFilters[key]) {
        if (Array.isArray(newFilters[key])) {
          const services = newFilters[key]
            .map((value) => value.toString())
            .join(",");
          queryParams.set(key, services);
        } else {
          queryParams.set(key, newFilters[key]);
        }
      }
    }

    const currentLocation = getUrlParams();

    if (currentLocation) {
      queryParams.set("city", currentLocation.city);
      queryParams.set("department", currentLocation.department);
    }

    // Construir la URL con los parámetros de consulta
    const searchString = queryParams.toString().replace(/%2C/g, ",");
    const newURL = `/search-deposits?${searchString}`;

    // Navegar a la nueva URL
    navigate(newURL);

    setOpen(false); // Cierra el diálogo después de aplicar los filtros
  };

  const handleCitiesLoaded = (loadedCities) => {
    setCities(loadedCities);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async (searchCity) => {
    setIsLoading(true);

    const foundCity = cities.find((city) => city.label === searchCity);

    if (foundCity) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate(
        `/search-deposits?city=${foundCity.cityName}&department=${foundCity.departmentName}`
      );
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <AutocompleteSearcher
          setSearchedCity={setSearchCity}
          onCitiesLoaded={handleCitiesLoaded}
        />
        <Button
          onClick={() => handleSearch(searchCity)}
          variant="contained"
          startIcon={<SearchRoundedIcon />}
          sx={{ marginLeft: 1 }}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            <>BUSCAR</>
          )}
        </Button>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<FilterAltRoundedIcon />}
          sx={{ marginLeft: 1 }}
        >
          FILTROS
        </Button>
        <SearchFiltersDialog
          open={open}
          handleClose={handleClose}
          onApplyFilters={handleFiltersChange}
        />
      </Stack>
    </ThemeProvider>
  );
}
