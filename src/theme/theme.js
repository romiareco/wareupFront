import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#02121f", // Color primario
    },
    secondary: {
      main: "#fdede0", // Color secundario
    },
    footer: {
      main: "#F2F2F2", // Ajusta el color de fondo que desees
    },
  },
  typography: {
    // Puedes personalizar la tipografía según tus preferencias
    fontFamily: "Montserrat, sans-serif",
    margin: 1,
    textAlign: "center",

    link: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "14px", // Ajusta el tamaño de la fuente según tus preferencias
      // Otros estilos de fuente aquí
    },
  },
  welcomePage: {
    palette: {
      primary: {
        main: "#9BB8F2", // Color de fondo principal (negro)
      },
    },
    sloganPaper: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "50px", // Ajusta el padding según tus necesidades
      textAlign: "left", // Cambia la alineación del texto a la izquierda
      color: "white", // Color de texto en el fondo de imagen
      minHeight: "500px", // Establece una altura mínima para el Paper
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // Centra verticalmente el contenido
    },
    divider: {
      width: "60%",
      bgcolor: "background.paper",
      height: 1, // Ajusta el valor para aumentar el grosor
      margin: "20px 0", // Agrega margen superior e inferior
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          marginBottom: "20px", // Ajusta el valor según tus necesidades
          textDecoration: "none", // Evita el subrayado por defecto
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Estilos generales para todos los botones
        root: {
          textTransform: "none", // Para mantener el texto en mayúscula y minúscula según lo ingresado
          borderRadius: "8px", // Personaliza el radio de borde según lo que desees
        },
        // Estilos para el botón con color primario
        containedPrimary: {
          // Personaliza los estilos para los botones con fondo de color primario
          color: "#ffffff", // Color del texto en los botones de color primario
          "&:hover": {
            backgroundColor: "#003f5c", // Color de fondo al pasar el ratón por encima
          },
        },
        // Estilos para el botón con color secundario
        containedSecondary: {
          // Personaliza los estilos para los botones con fondo de color secundario
          color: "#02121f", // Color del texto en los botones de color secundario
          "&:hover": {
            backgroundColor: "#f95d6a", // Color de fondo al pasar el ratón por encima
          },
        },
        // Estilos para los botones de tamaño "large"
        sizeLarge: {
          // Ajusta el tamaño de fuente y el padding para los botones "large"
          fontSize: "1.2rem",
          padding: "14px 24px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        // Estilos generales para todos los MenuItem
        root: {
          color: "inherit", // Color de texto del tema
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)", // Color de fondo de acción del tema
          },
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        size: "medium", // Hacer que todos los botones de LoadingButton sean de tamaño "medium" por defecto
      },
    },
  },
  menuItemGetStyles: (name, company) => ({
    fontWeight:
      company.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }),
});

export default theme;
