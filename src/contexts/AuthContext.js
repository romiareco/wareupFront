import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLaoding] = useState(true);

  console.log("User: " + user);

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      console.log("AccessToken en useEffect: " + accessToken);
      const refreshToken = authController.getRefreshToken();
      console.log("RefreshToken en useEffect: " + refreshToken);

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
      console.log("Login Context");
      console.log("AccessToken: " + accessToken);

      const response = await userController.getCurrentUserInformation(
        accessToken
      );

      console.log("User info: " + response.user.email);
      delete response.user.password;
      setUser(response.user);
      console.log("User en login: " + JSON.stringify(user));
      console.log("Response login: " + JSON.stringify(response));

      setToken(accessToken);
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

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
