import { UserInformationProfile } from "../../components/Users";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../hooks";
import { Box } from "@mui/material";

export function UserProfile() {
  const { user } = useAuth();

  return (
    <Box>
      <UserInformationProfile user={user} />
      <Footer />
    </Box>
  );
}
