import { Container, Divider, Stack } from "@mui/material";
import { Gallery } from "./Gallery";
import { Description } from "./Description";
import { Services } from "./Services";
import React, { useState, useEffect } from "react";
import "../../theme/PublicationView.css";

import { Box } from "@mui/system";
import { useAuth } from "../../hooks";
import { useLocation } from "react-router-dom";

export function PublicationView() {
  const location = useLocation();

  // Obtén el parámetro depositId de la URL
  const searchParams = new URLSearchParams(location.search);
  const depositId = searchParams.get("id");

  return (
    <Container component="section" maxWidth={"lg"}>
      <Box className="core">
        <Gallery depositId={depositId} />
        <Description depositId={depositId} />
      </Box>
      <Divider />
      <Box className="core">
        <Services depositId={depositId} />
      </Box>
    </Container>
  );
}
