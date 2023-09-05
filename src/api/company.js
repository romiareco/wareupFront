import { ENV } from "../utils/constant";

export class Company {
  baseApi = ENV.BASE_API;

  async register(accessToken, user, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMPANY}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: user.id,
          businessName: data.businessName,
          contactName: data.contactName,
          position: data.position,
          RUT: data.RUT,
          email: data.email,
          phone: data.phone,
          address: data.address,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " +
          JSON.stringify(error.message)
      );
      throw error;
    }
  }

  async delete(accessToken, id) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMPANY}/${id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " +
          JSON.stringify(error.message)
      );
      throw error;
    }
  }

  async update(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMPANY}/${data.id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          businessName: data.businessName,
          contactName: data.contactName,
          position: data.position,
          RUT: data.RUT,
          email: data.email,
          phone: data.phone,
          address: data.address,
          status: data.status,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " +
          JSON.stringify(error.message)
      );
      throw error;
    }
  }

  async getAllCompanies(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMPANY}`;
      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " +
          JSON.stringify(error.message)
      );
      throw error;
    }
  }

  async getAllActiveCompanies(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMPANY}`;

      const queryParams = {
        status: "1",
      };
      const queryString = new URLSearchParams(queryParams).toString();

      const fullUrl = `${url}?${queryString}`;

      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(fullUrl, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      if (result && result.hasError) throw result;

      return result;
    } catch (error) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " +
          JSON.stringify(error.message)
      );
      throw error;
    }
  }
}
