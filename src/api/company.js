import { ENV } from "../utils/constant";

export class Company {
    baseApi = ENV.BASE_API;

    async register(accessToken, user, data) {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.COMPANY}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                    businessName: data.businessName,
                    name: data.name,
                    position: data.position,
                    RUT: data.rut,
                    email: data.email,
                    phone: data.phoneNumber,
                    address: data.address
                }),
            };

            console.log("Registrar compañia: "+ params.body)
            const response = await fetch(url, params);
            const result = await response.json();

            console.log("Registrar compañia respuesta: "+ result)

            if(response.status !== 201) throw result;
            
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}