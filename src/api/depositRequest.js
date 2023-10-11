import { ENV } from "../utils";

export class DepositRequest {
  baseApi = ENV.BASE_API;

  async requestDepositPublication(accessToken, data, user) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_REQUEST}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: user.id,
          companyId: data.companyId,
          address: data.address,
          phone: data.phone,
          cityId: data.cityId,
          email: user.email,
          title: data.title,
          description: data.description,
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

  async getAllRequestDeposits(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_REQUEST}`;
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

  async getDepositsRequestsByUserId(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_DEPOSIT_REQUEST}/${userId}`;
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
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " +
          JSON.stringify(error.message)
      );
      throw error;
    }
  }

  async updateRequestDepositStatus(accessToken, requestDepositId, status) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_REQUEST}/${requestDepositId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status: status,
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

}
