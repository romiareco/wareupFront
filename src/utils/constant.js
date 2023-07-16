export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200

const SERVER_IP = "localhost:3001";

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        CURRENT_USER_INFO: "users/me",
        REGISTER_USER: "users",
        RECOVER_PASSWORD: "users/recover-password",
        COMPANY: "companies",
        USER_COMPANY: "companies/byUser",
        STORAGE_REQUEST: "depositRequests",
        CONTACT: "users/contact",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
      },
};