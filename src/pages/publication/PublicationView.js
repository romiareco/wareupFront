import { Container, Divider } from "@mui/material";
import { Gallery, Description, Services } from "../../components/PublicationView";
import { Footer } from "../../components/Footer";
import React from "react";
import "../../theme/PublicationView.css";

import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

export function PublicationView() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const depositId = searchParams.get("id");

  return (
    <Box>
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
      <Footer />
    </Box>
  );
}
