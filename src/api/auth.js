import { ENV } from "../utils";

export class Auth {
  baseApi = ENV.BASE_API;

  async login(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
      console.log(url);
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(params);

      const response = await fetch(url, params);
      console.log(response);
      const result = await response.json();

      if (response.status !== 200) throw result;
      if (result && result.hasError) throw result;

      return result;
    } catch (exception) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + exception.message)
      throw exception;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + error.message)
      throw error;
    }
  }

  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }

  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
