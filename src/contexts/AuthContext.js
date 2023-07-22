import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";
import { role } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();
  
      if (!accessToken || !refreshToken) {
        logout();
        setLaoding(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLaoding(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      );
      authController.setAccessToken(accessToken);
      await login(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (accessToken) => {
    try {
      const response = await userController.getCurrentUserInformation(
        accessToken
      );

      setUser(response.user);
      setToken(accessToken);

      if (user.role === role.ADMIN) {
        loginAdmin();
      } else {
        loginUser();
      }

    } catch (exception) {
      console.error(exception);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (loading) return null;

  const loginAdmin = () => {
    navigate("/admin/home");
  }

  const loginUser = () => {
    navigate("/users/home");
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
