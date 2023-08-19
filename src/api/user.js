import { ENV } from "../utils/constant";

export class User {
  baseApi = ENV.BASE_API;

  async getCurrentUserInformation(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CURRENT_USER_INFO}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  async register(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  async recoverPassword(data) {
    try {
      console.log(data);

      const url = `${this.baseApi}/${ENV.API_ROUTES.RECOVER_PASSWORD}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      };

      const response = await fetch(url, params);
      console.log(response);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  //TODO: hacer método o ver de eliminarlo sino sirve
  async requestDepositRegistration(data) {
    try {
      //TODO: pending backend endpoint
      console.log(data);
    } catch (exception) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " + exception.msg
      );
      throw exception;
    }
  }

  async getUserCompanies(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_COMPANY}/${userId}`;
      console.log("GetUserCompanies URL: " + url);
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message));
      throw error;
    }
  }

  async updatePassword(data, tokenParam) {
    console.log(data);
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.UPDATE_PASSWORD}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          linkEncrypt: tokenParam,
        }),
      };

      const response = await fetch(url, params);
      console.log(response);
      const result = await response.json();

      if (response.status !== 201) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  async updateUser(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
      const params = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          lastName: data.lastName,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  async getUserDeposits(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.STORAGE}/byUser/${userId}`;
      console.log("GetUserDeposits URL: " + url);
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  async getAllUsers(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  async getUserById(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${userId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }

  //TODO: pendiente definir
  async deleteUser(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${userId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
      throw error;
    }
  }
}
