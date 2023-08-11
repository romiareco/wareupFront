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
          contactName: data.contactname,
          position: data.position,
          RUT: data.rut,
          email: data.email,
          phone: data.phoneNumber,
          address: data.address,
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
}
