import { ENV } from "../utils/constant";

export class Company {
    baseApi = ENV.BASE_API;

    async register(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.COMPANY}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: data.userId,
                    businessName: data.businessName,
                    name: data.name,
                    RUT: data.RUT,
                    email: data.email,
                    phone: data.phone,
                    contactName: data.contactName
                }),
            };

            console.log("Registrar compañia: "+ params)
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