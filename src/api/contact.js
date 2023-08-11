import { ENV } from "../utils";

export class Contact {
  baseApi = ENV.BASE_API;

  async contact(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CONTACT}`;
      console.log(url);
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: data.name,
          phone: data.phoneNumber,
          email: data.email,
          message: data.message,
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
