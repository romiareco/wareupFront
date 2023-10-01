import { RegisterRequestDeposit } from "../../components/Forms/RegisterRequestDepositForm";
import { Footer } from "../../components/Footer";
import { Box } from "@mui/material";
import banner from "../../assets/official-images/wms-top-header-1-1.jpg";

export function UserRequestDeposit() {
  return (
    <Box sx={{ backgroundImage: `url(${banner})` }}>
      <RegisterRequestDeposit />
      <Footer />
    </Box>
  );
}
