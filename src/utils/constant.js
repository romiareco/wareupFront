export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200

const SERVER_IP = "localhost:3001";

//TODO: separar API_ROUTES por entidad
export const ENV = {
    BASE_PATH: `https://wareup-api.onrender.com/`,
    BASE_API: `https://wareup-api.onrender.com/api/v1`,
    API_ROUTES: {
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        CURRENT_USER_INFO: "users/me",
        USER: "users",
        RECOVER_PASSWORD: "users/recover-password",
        COMPANY: "companies",
        USER_COMPANY: "companies/byUser",
        STORAGE_REQUEST: "depositRequests",
        CONTACT: "users/contact",
        UPDATE_PASSWORD: "users/update-password",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
      },
};