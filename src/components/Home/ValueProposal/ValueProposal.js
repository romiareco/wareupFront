import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import theme from "../../../theme/theme";
import flexibility from "../../../assets/official-images/flexibility.png";
import dedication from "../../../assets/official-images/dedication.png";
import handshake from "../../../assets/official-images/hand-shake-2.png";
import humanQuality from "../../../assets/official-images/human-quality.png";
import profitability from "../../../assets/official-images/profitability.png";
import { CustomValueProposalAvatar } from "../../Avatars";
import { CustomValueProposalTypography } from "../../Typography";
import { ThemeProvider, Typography, Box, Stack } from "@mui/material";

import backgroundImage from "../../../assets/official-images/productCurvyLines.png";

const ValueComponent = ({ avatarSrc, avatarAlt, title, description }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <CustomValueProposalAvatar src={avatarSrc} alt={avatarAlt} />
    <CustomValueProposalTypography variant="h6" text={title} />
    <CustomValueProposalTypography variant="body1" text={description} />
  </Box>
);

export function ValueProposal() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: "30px", // Ajusta el relleno superior según tus necesidades
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#0B2C4D",
          color: theme.welcomePage.palette.primary.contrastText, // Letras blancas
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          PROPUESTA DE VALOR
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "white" }}>
          Nuestra propuesta de valor se apoya en 5 pilares:
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item md={2}>
            <ValueComponent
              avatarSrc={flexibility}
              avatarAlt="Flexibility"
              title="FLEXIBILIDAD"
              description="Ofrecemos una propuesta flexible, adaptándonos a la necesidad de cada cliente."
            />
          </Grid>
          <Grid item md={2}>
            <ValueComponent
              avatarSrc={handshake}
              avatarAlt="Handshake"
              title="CONFIANZA"
              description="Construimos una red de confianza a todo nivel en lo que hacemos."
            />
          </Grid>
          <Grid item md={2}>
            <ValueComponent
              avatarSrc={dedication}
              avatarAlt="Dedication"
              title="DEDICACIÓN"
              description="Nos abocamos a cada tarea con la dedicación y profesionalismo que nuestros clientes merecen."
            />
          </Grid>
          <Grid item md={2}>
            <ValueComponent
              avatarSrc={humanQuality}
              avatarAlt="Human Quality"
              title="CALIDAD HUMANA"
              description="La tecnología que utilizamos es la plataforma para entregar la calidad humana detrás de cada actividad que realizamos."
            />
          </Grid>
          <Grid item md={2}>
            <ValueComponent
              avatarSrc={profitability}
              avatarAlt="Profitability"
              title="RENTABILIDAD"
              description="Hacemos todo enfocados en lograr tener un impacto positivo en sus resultados."
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
