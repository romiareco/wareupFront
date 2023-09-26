
import { ENV } from "../utils/constant";

export class BookingRequest {
    baseApi = ENV.BASE_API;

    async registerBookingRequest(accessToken, data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.BOOKING_REQUEST}`;
            const params = {
                method: "POST",
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
            console.error("Hubo un error en la respuesta del servidor. Error: " + JSON.stringify(error.message))
            throw error;
        }
    }
}