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

  async requestDepositPublication(accessToken, data, user) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.STORAGE_REQUEST}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          companyId: data.userCompanyId,
          address: data.storageAddress,
          phone: data.storagePhoneNumber,
          cityId: data.cityId,
          email: user.email,
          title: data.title,
          description: data.description,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw response;
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
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_IMAGES}/${depositId}`;
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
      const url = `${this.baseApi}/${ENV.API_ROUTES.DEPOSIT_IMAGES}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          images: images,
          depositId: depositId
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
