import { UserInformationProfile } from "../../components/Users";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../hooks";

export function UserProfile() {
    const { user } = useAuth();

    return (
        <div>
            <UserInformationProfile user={user}/>
            <Footer />
        </div>
    )
  };