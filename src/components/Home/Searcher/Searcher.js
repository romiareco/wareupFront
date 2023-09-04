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

const handleSearch = (query) => {
  // Aquí puedes agregar la lógica para realizar la búsqueda
  console.log("Buscando:", query);
};

const suggestedCities = ["Barrio Sur", "Ciudad Vieja", "Malvin"];

export function Searcher() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px", // Ajusta el relleno superior según tus necesidades
          backgroundColor: "#0B2C4D",
          color: "white", // Color de texto en el fondo de imagen
        }}
      >
        <Typography variant="h4" sx={theme.typography.montserratFont}>
          Comienza tu búsqueda
        </Typography>
        <Stack direction={"row"} sx={{ width: "60%" }}>
          <Autocomplete
            fullWidth
            freeSolo
            options={suggestedCities}
            renderInput={(params) => (
              <Box width="100%">
                <TextField
                  {...params}
                  fullWidth
                  autoComplete="new-password"
                  label="Barrio/Ciudad"
                  variant="filled"
                  type="search"
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                  }}
                />
              </Box>
            )}
          />
          <IconButton onClick={() => handleSearch()}>
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>
        </Stack>

        <Divider sx={theme.welcomePage.divider} />

        <SignUpButton textName={"Se parte de la comunidad"} />
      </Box>
    </ThemeProvider>
  );
}
