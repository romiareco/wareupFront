export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200

const SERVER_IP = "localhost:3001";
//TODO: separar API_ROUTES por entidad
export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        CURRENT_USER_INFO: "users/me",
        USER: "users",
        RECOVER_PASSWORD: "users/recover-password",
        COMPANY: "companies",
        USER_COMPANY: "companies/byUser",
        CONTACT: "users/contact",
        UPDATE_PASSWORD: "users/update-password",
        DEPARTMENTS: "common/departments",
        DEPOSIT: "deposits",
        SERVICES: "serviceGroups",
        DEPOSIT_IMAGES: "deposits/images",
        DEPOSIT_REQUEST: "depositRequests",
        USER_DEPOSITS: "deposits/byUser",
        USER_DEPOSIT_REQUEST: "depositRequests/byUser",
        DEPOSIT_SERVICES: "deposits/services",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
      },
};