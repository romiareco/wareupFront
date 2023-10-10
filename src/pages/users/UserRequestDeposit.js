import { RegisterRequestDeposit } from "../../components/Forms/RegisterRequestDepositForm";
import { Footer } from "../../components/Footer";
import { Box } from "@mui/material";
import banner from "../../assets/official-images/wms-top-header-1-1.jpg";
import { useEffect } from "react";

export function UserRequestDeposit() {
  useEffect(() => {
    document.title = "Registrar solicitud de publicación de depósito";
  }, []);

  return (
    <Box sx={{ backgroundImage: `url(${banner})` }}>
      <RegisterRequestDeposit />
      <Footer />
    </Box>
  );
}
