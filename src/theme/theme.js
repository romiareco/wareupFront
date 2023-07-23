import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#02121f', // Color primario
    },
    secondary: {
      main: '#fdede0', // Color secundario
    },
    // Aquí puedes definir más colores según tus necesidades
  },
  typography: {
    // Puedes personalizar la tipografía según tus preferencias
    fontFamily: 'Arial, sans-serif',
  },
  // Personalización de los botones
  components: {
    MuiButton: {
      styleOverrides: {
        // Estilos generales para todos los botones
        root: {
          textTransform: 'none', // Para mantener el texto en mayúscula y minúscula según lo ingresado
          borderRadius: '8px', // Personaliza el radio de borde según lo que desees
        },
        // Estilos para el botón con color primario
        containedPrimary: {
          // Personaliza los estilos para los botones con fondo de color primario
          color: '#ffffff', // Color del texto en los botones de color primario
          '&:hover': {
            backgroundColor: '#003f5c', // Color de fondo al pasar el ratón por encima
          },
        },
        // Estilos para el botón con color secundario
        containedSecondary: {
          // Personaliza los estilos para los botones con fondo de color secundario
          color: '#02121f', // Color del texto en los botones de color secundario
          '&:hover': {
            backgroundColor: '#f95d6a', // Color de fondo al pasar el ratón por encima
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
          color: 'inherit', // Color de texto del tema
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Color de fondo de acción del tema
          },
        },
      },
    },
    MuiLoadingButton: {
        defaultProps: {
          size: "medium", // Hacer que todos los botones de LoadingButton sean de tamaño "medium" por defecto
        },
    }
  },
  menuItemGetStyles: (name, company) => ({
    fontWeight: company.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  }),
});

export default theme;
