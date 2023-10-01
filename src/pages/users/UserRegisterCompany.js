import { Footer } from "../../components/Footer";
import { Box } from "@mui/material";
import banner from "../../assets/official-images/wms-top-header-1-1.jpg";
import { RegisterCompany } from "../../components/Forms";

export function UserRegisterCompany() {
  return (
    <Box sx={{ backgroundImage: `url(${banner})` }}>
      <RegisterCompany />
      <Footer />
    </Box>
  );
}
