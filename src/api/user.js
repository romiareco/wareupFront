import { ENV } from "../utils/constant";

export class User {
    baseApi = ENV.BASE_API;

    async getCurrentUserInformation(accessToken) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.CURRENT_USER_INFO}`;
          const params = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
    
          const response = await fetch(url, params);
          const result = await response.json();
    
          if (response.status !== 201) throw result;
    
          return result;
        } catch (error) {
          throw error;
        }
      }

    async register(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    last_name: data.last_name,
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

    async recoverPassword(email) {
      try {
        console.log(email);

        const url = `${this.baseApi}/${ENV.API_ROUTES.RECOVER_PASSWORD}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({  
                email: email
            }),
        };

          const response = await fetch(url, params);
          console.log(response);
          const result = await response.json();

          if(response.status !== 201) throw result;
          
          return result;
      } catch (error) {
          console.log(error);
          throw error;
      }
    }
}