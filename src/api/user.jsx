import { ENV } from "../utils/constant";

export class User {
    baseApi = ENV.BASE_API;

    async signUp(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.SIGN_UP}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password
                }),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 201) throw result;
            
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}