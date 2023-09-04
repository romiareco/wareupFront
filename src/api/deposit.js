import { ENV } from "../utils";

export class Deposit {
  baseApi = ENV.BASE_API;

  async register(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          description: data.description,
          totalM3: data.totalM3,
          minimumBusinessPeriod: data.minimumBusinessPeriod,
          minimumBusinessVolume: data.minimumBusinessVolume,
          street: data.street,
          expectedPrice: data.expectedPrice,
          cityId: data.cityId,
          companyId: data.companyId,
          postalCode: data.postalCode,
          currency: data.currency,
          servicesId: data.servicesId,
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

  async updateDeposit(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT}/${data.id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          description: data.description,
          totalM3: data.totalM3,
          minimumBusinessPeriod: data.minimumBusinessPeriod,
          minimumBusinessVolume: data.minimumBusinessVolume,
          street: data.street,
          expectedPrice: data.expectedPrice,
          cityId: data.cityId,
          companyId: data.companyId,
          postalCode: data.postalCode,
          currency: data.currency,
          servicesId: data.servicesId,
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

  async getDepositImages(accessToken, depositId) {
    try {
      const numberDepositId = parseInt(depositId);
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_IMAGES}/${numberDepositId}`;
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

  async addDepositImages(accessToken, depositId, images) {
    try {
      const numberDepositId = parseInt(depositId);
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_IMAGES}/${numberDepositId}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          images: images,
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

  async getAllDeposits(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT}`;
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

  async getDepositsByUserId(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_DEPOSITS}/${userId}`;
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

  async deleteDeposit(accessToken, depositId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT}/${depositId}`;
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

  async getDepositById(accessToken, depositId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT}/${depositId}`;
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

  async getDepositServicesById(accessToken, depositId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_SERVICES}/${depositId}`;
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
}
