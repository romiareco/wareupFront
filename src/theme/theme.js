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
      main: "#F2F2F2",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    margin: 1,
    textAlign: "center",

    link: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "14px",
    },
  },
  welcomePage: {
    palette: {
      primary: {
        main: "#9BB8F2",
      },
    },
    sloganPaper: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "50px",
      textAlign: "left",
      color: "white",
      minHeight: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    divider: {
      width: "60%",
      bgcolor: "background.paper",
      height: 1,
      margin: "20px 0",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
        containedPrimary: {
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#003f5c",
          },
        },
        containedSecondary: {
          color: "#02121f",
          "&:hover": {
            backgroundColor: "#f95d6a",
          },
        },
        sizeLarge: {
          fontSize: "1.2rem",
          padding: "14px 24px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "inherit",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        size: "medium",
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
