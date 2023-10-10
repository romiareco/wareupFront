import { Footer } from "../../components/Footer";
import { Box } from "@mui/material";
import banner from "../../assets/official-images/wms-top-header-1-1.jpg";
import { RegisterCompany } from "../../components/Forms";
import { useEffect } from "react";

export function UserRegisterCompany() {
  useEffect(() => {
    document.title = "Registrar nueva empresa";
  }, []);

  return (
    <Box sx={{ backgroundImage: `url(${banner})` }}>
      <RegisterCompany />
      <Footer />
    </Box>
  );
}
