import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../theme/theme";
import { AutocompleteSearcher } from "../Autocomplete";
import { Button, CircularProgress } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export function QuickSearcher() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]); // Estado local para almacenar los datos de cities

  const handleCitiesLoaded = (loadedCities) => {
    setCities(loadedCities); // Actualiza el estado con los datos de cities
  };

  const handleSearch = async (searchCity) => {
    setIsLoading(true);

    const foundCity = cities.find((city) => city.cityLabel === searchCity);

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
      <AutocompleteSearcher
        setSearchedCity={setSearchCity}
        onCitiesLoaded={handleCitiesLoaded}
      />
      <Button
        onClick={() => handleSearch(searchCity)}
        variant="filledTonal"
        startIcon={<SearchRoundedIcon />}
      >
         {isLoading ? ( // Muestra un indicador de carga si isLoading es true
              <CircularProgress color="inherit" size={24} />
            ) : (
              <>
                BUSCAR
              </>
            )}
      </Button>
    </ThemeProvider>
  );
}
