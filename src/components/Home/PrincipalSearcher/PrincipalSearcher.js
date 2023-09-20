import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Box,
  Divider,
  Button,
  CircularProgress, // Importa CircularProgress de Material-UI
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { SignUpButton } from "../../Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AutocompleteSearcher } from "../../Autocomplete";

export function PrincipalSearcher() {
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
          <AutocompleteSearcher
            setSearchedCity={setSearchCity}
            onCitiesLoaded={handleCitiesLoaded}
          />
          <Button
            startIcon={<SearchRoundedIcon />}
            onClick={() => handleSearch(searchCity)}
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
            {isLoading ? ( // Muestra un indicador de carga si isLoading es true
              <CircularProgress color="inherit" size={24} />
            ) : (
              <>
                <span style={{ fontSize: "1rem" }}>BUSCAR</span>
              </>
            )}
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
