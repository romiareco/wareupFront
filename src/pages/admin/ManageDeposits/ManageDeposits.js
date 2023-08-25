import { RegisterDeposit } from "../../../components/Forms/RegisterDepositForm";
import { ThemeProvider, Typography, Box } from "@mui/material";
import { RegisteredDepositsTable } from "../../../components/Tables";
import banner from "../../../assets/official-images/banner-1.jpg";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import theme from "../../../theme/theme";
import { Footer } from "../../../components/Footer";
import { Button, Divider } from "@mui/material";

export function ManageDeposits() {
  const handleAddDeposit = () => {
    return <RegisterDeposit />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          paddingBottom: "40px",
          paddingTop: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...theme.typography.montserratFont,
            color: "white", // Alinea el texto a la izquierda
          }}
        >
          Depósitos registrados
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          padding={2}
        >
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineTwoToneIcon />}
            onClick={handleAddDeposit}
          >
            Agregar depósito
          </Button>
        </Box>

        <Divider light variant="middle" sx={{ borderBottomWidth: "3px" }} />

        <Box
          padding={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RegisteredDepositsTable />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
