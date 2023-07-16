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
    
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
          throw error;
        }
      }

    async register(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER_USER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    lastName: data.lastName,
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
      } catch (exception) {
          console.log(exception);
          throw exception;
      }
    }

    async requestStorageRegistration(data) {
      try {
        //TODO: pending backend endpoint
         console.log(data);
       } catch (exception) {
         console.error("Hubo un error en la respuesta del servidor. Error: " + exception.msg)
         throw exception;
       }
    }

    async getUserCompanies(accessToken, userId) {
      try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.USER_COMPANY}/${userId}`;
        console.log("GetUserCompanies URL: "+url);
        const params = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 200) throw result;
  
        return result;
      } catch (error) {
        throw error;
      }
    }
}