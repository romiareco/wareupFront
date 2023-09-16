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
          paddingTop: "40px",
          paddingBottom: "80px",
          backgroundColor: "#0B2C4D",
          color: "white", // Color de texto en el fondo de imagen
        }}
      >
        <Typography variant="h4" sx={{...theme.typography.montserratFont, marginBottom: 6}}>
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
