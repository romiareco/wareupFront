import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function LinkedinLogo() {
  return (
      <a
        href="https://www.linkedin.com/company/wareup/about/"
        target="_blank" // Abre enlace en una nueva pestaña
        rel="noopener noreferrer" // Buenas prácticas para seguridad
      >
        <LinkedInIcon />
      </a>
  );
}
