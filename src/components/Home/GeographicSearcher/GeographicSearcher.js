import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Box,
  Divider,
  TextField,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import SearchIcon from "@mui/icons-material/Search";
import { SignUpButton } from "../../Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { Common } from "../../../api";

const commonController = new Common();

export function GeographicSearcher() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await commonController.getDepartments();

        if (response && response.departments.length > 0) {
          const result = response.departments.reduce(
            (accumulator, department) => {
              department.cities.forEach((city) => {
                accumulator.push({
                  cityLabel: `${city.title}, ${department.title}`,
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
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSearch = () => {
    // Cargar los nombres de las ciudades y sus departamentos para que tengamos el listado completo en el suggestedCities
    console.log("Buscando:", searchCity);
    navigate(`/search-deposits?city=${searchCity}&department=`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "40px",
          paddingBottom: "80px",
          backgroundColor: "#0B2C4D",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{ ...theme.typography.montserratFont, marginBottom: 6 }}
        >
          Comienza tu búsqueda
        </Typography>
        <Stack
          direction={"row"}
          alignItems="stretch" // Esto estira ambos elementos para que tengan la misma altura
          spacing={1}
        >
          <Autocomplete
            id="searchInput"
            freeSolo
            options={
              cities.length > 0
                ? cities.map((city) => city.cityLabel)
                : ["Cargando..."]
            }
            inputValue={searchCity}
            onInputChange={(event, newValue) => {
              setSearchCity(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Barrio/Ciudad"
                variant="filled"
                disabled={cities.length === 0} // Deshabilita el TextField cuando cities aún no está cargado
                style={{
                  width: "900px", // Ajusta el ancho aquí
                  backgroundColor: "white",
                }}
              />
            )}
            renderOption={(props, option) => <li {...props}>{option}</li>}
          />
          <Button
            onClick={() => handleSearch()}
            variant="outlined"
            style={{
              display: "flex",
              alignItems: "center",
              color: "white", // Cambia el color del texto a blanco
              border: "1px solid white", // Agrega un borde blanco al botón
              borderRadius: "10px", // Puntas redondeadas
              width: "150px", // Ancho en estado normal
              transition: "width 0.3s ease-in-out", // Transición suave de ancho
              justifyContent: "center", // Centra horizontalmente
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white"; // Cambia el color de fondo en hover
              e.currentTarget.style.color = "black"; // Cambia el color del texto en hover
              e.currentTarget.style.width = "150px"; // Cambia el ancho en hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"; // Vuelve al color de fondo en estado normal
              e.currentTarget.style.color = "white"; // Vuelve al color del texto en estado normal
              e.currentTarget.style.width = "150px"; // Vuelve al ancho en estado normal
            }}
          >
            <SearchIcon sx={{ fontSize: 24 }} />
            <span style={{ fontSize: "1rem" }}>BUSCAR</span>
          </Button>
        </Stack>

        <Divider sx={theme.welcomePage.divider} />
        <Box>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ width: "100%" }}
          >
            <SignUpButton textName={"Sé parte de la comunidad"} />
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
