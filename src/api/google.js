import { ENV } from "../utils";

export class google {
  async getLocationCoordinates(depositAddress, department) {
    try {
      const buildAddress = depositAddress + ", " + department;
      const queryParams = {
        address: buildAddress,
        key: ENV.API_KEY.GOOGLE_MAPS,
      };

      let buildParamsForQuery = "";

      for (const key in queryParams) {
        buildParamsForQuery += `${key}=${queryParams[key]}&`;
      }

      const url = `${ENV.CONSTANT_ROUTES.GOOGLE_MAPS_LOCATION_COORDINATES}?${buildParamsForQuery}`;
      const params = {
        headers: {
          "Content-Type": "application/json",
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
