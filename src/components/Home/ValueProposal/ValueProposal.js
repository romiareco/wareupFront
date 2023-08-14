import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import theme from "../../../theme/theme";
import flexibility from "../../../assets/official-images/flexibility.png";
import dedication from "../../../assets/official-images/dedication.png";
import handshake from "../../../assets/official-images/hand-shake-2.png";
import humanQuality from "../../../assets/official-images/human-quality.png";
import profitability from "../../../assets/official-images/profitability.png";
import { CustomValueProposalAvatar } from "../../Avatars";
import { CustomValueProposalTypography } from "../../Typography";
import { ThemeProvider, Typography, Box, Stack } from "@mui/material";

const ValueComponent = ({ avatarSrc, avatarAlt, title, description }) => (
  <Box>
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
          backgroundColor: theme.welcomePage.palette.primary.main, // Fondo negro
          color: theme.welcomePage.palette.primary.contrastText, // Letras blancas
        }}
      >
        <Typography variant="h4" sx={theme.typography.montserratFont}>
          PROPUESTA DE VALOR
        </Typography>
        <Typography variant="subtitle1" sx={theme.typography.montserratFont}>
          Nuestra propuesta de valor se apoya en 5 pilares:
        </Typography>
        <Box sx={{ flexGrow: 1, margin: "0 auto", maxWidth: "900px" }}>
          <Stack direction="row" spacing={4}>
            <ValueComponent
              avatarSrc={flexibility}
              avatarAlt="Flexibility"
              title="FLEXIBILIDAD"
              description="Ofrecemos una propuesta flexible, adaptándonos a la necesidad de cada cliente."
            />

            <ValueComponent
              avatarSrc={handshake}
              avatarAlt="Handshake"
              title="CONFIANZA"
              description="Construimos una red de confianza a todo nivel en lo que hacemos."
            />

            <ValueComponent
              avatarSrc={dedication}
              avatarAlt="Dedication"
              title="DEDICACIÓN"
              description="Nos abocamos a cada tarea con la dedicación y profesionalismo que nuestros clientes merecen."
            />

            <ValueComponent
              avatarSrc={humanQuality}
              avatarAlt="Human Quality"
              title="CALIDAD HUMANA"
              description="La tecnología que utilizamos es la plataforma para entregar la calidad humana detrás de cada actividad que realizamos."
            />

            <ValueComponent
              avatarSrc={profitability}
              avatarAlt="Profitability"
              title="RENTABILIDAD"
              description="Hacemos todo enfocados en lograr tener un impacto positivo en sus resultados."
            />
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
