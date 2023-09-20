import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Common } from "../../api";

const commonController = new Common();

export function AutocompleteSearcher({ setSearchedCity, onCitiesLoaded  }) {
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await commonController.getDepartments();

        if (response && response.departments.length > 0) {
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

          result.sort((a, b) => a.cityLabel.localeCompare(b.cityLabel));
          setCities(result);
          onCitiesLoaded(result);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Autocomplete
      id="searchInput"
      freeSolo
      options={
        cities.length > 0 ? cities.map((value) => value.label) : ["Cargando..."]
      }
      inputValue={searchCity}
      onInputChange={(event, newValue) => {
        setSearchCity(newValue); // Actualiza el estado en el componente padre
        setSearchedCity(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Barrio/Ciudad"
          variant="filled"
          disabled={cities.length === 0}
          style={{
            width: "900px", // Ajusta el ancho aquí
            backgroundColor: "white",
          }}
        />
      )}
      renderOption={(props, option) => <li {...props}>{option}</li>}
    />
  );
}
