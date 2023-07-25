import { ENV } from "../utils/constant";

export class Common {
    baseApi = ENV.BASE_API;

    async getDepartments(accessToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.DEPARTMENTS}`;
            const params = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}