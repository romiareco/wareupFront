import React from "react";
import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import banner from "../../../assets/official-images/banner-1.jpg";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export function Slogan() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...theme.welcomePage.sloganPaper,
          backgroundImage: `url(${banner})`,
        }}
      >
        <motion.div
          initial={{ x: "100%" }} 
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          <Typography
            variant="h3"
            sx={{
              ...theme.typography.montserratFont,
              textAlign: "right",
            }}
          >
            La logística para todos.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              ...theme.typography.montserratFont,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            +Flexible +Confiable +Simple
          </Typography>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}
