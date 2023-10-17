import { UserInformationProfile } from "../../components/Users";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../hooks";
import { Box } from "@mui/material";
import { useEffect } from "react";

export function UserProfile() {
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Mi perfil";
  }, []);

  return (
    <Box>
      <UserInformationProfile user={user} />
      <Footer />
    </Box>
  );
}
