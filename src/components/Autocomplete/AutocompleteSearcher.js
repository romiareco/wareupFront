import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Common } from "../../api";

const commonController = new Common();

export function AutocompleteSearcher({ setSearchedCity, onCitiesLoaded }) {
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState([]);
  const [citiesLoaded, setCitiesLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await commonController.getDepartments();

        if (!citiesLoaded && response && response.departments.length > 0) {
          const result = response.departments.reduce(
            (accumulator, department) => {
              department.cities.forEach((city) => {
                accumulator.push({
                  label: `${city.title}, ${department.title}`,
                  cityId: city.id,
                  departmentId: department.id,
                  cityName: city.title,
                  departmentName: department.title,
                });
              });
              return accumulator;
            },
            []
          );

          result.sort((a, b) => a.label.localeCompare(b.label));
          setCities(result);
          onCitiesLoaded(result);
          setCitiesLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [onCitiesLoaded, citiesLoaded]);

  return (
    <Autocomplete
      id="searchInput"
      freeSolo
      options={
        cities.length > 0 ? cities.map((value) => value.label) : ["Cargando..."]
      }
      inputValue={searchCity}
      onInputChange={(event, newValue) => {
        setSearchCity(newValue);
        setSearchedCity(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Barrio/Ciudad"
          variant="filled"
          disabled={cities.length === 0}
          sx={{
            width: "900px",
            backgroundColor: "white",
          }}
        />
      )}
      renderOption={(props, option) => <li {...props}>{option}</li>}
    />
  );
}
