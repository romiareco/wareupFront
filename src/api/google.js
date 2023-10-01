import { ENV } from "../utils";

export class Google {
  async getLocationCoordinates(depositAddress, department) {
    try {
      const buildAddress = depositAddress + ", " + department + ", Uruguay";

      const url = `${
        ENV.CONSTANT_ROUTES.GOOGLE_MAPS_LOCATION_COORDINATES
      }?address=${encodeURIComponent(buildAddress)}&key=${
        ENV.API_KEY.GOOGLE_MAPS
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error:",
        error
      );
      throw error;
    }
  }
}
