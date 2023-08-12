import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { LinkedinLogo } from "../SocialMedia";

const styles = {
  linkedinLogo: {
    verticalAlign: "middle", // Alinea verticalmente el logo con el texto
    marginLeft: "5px", // Agrega un espacio entre el texto y el logo
  },
  linkedinButton: {
    margin: 0, /* Elimina el margen en todas las direcciones */
  }
};


export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://wareup.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      <span className={styles.linkedinLogo}>
        <LinkedinLogo />
      </span>
    </Typography>
  );
}
