import { ENV } from "../utils";

export class Contact {
    baseApi = ENV.BASE_API;

    async contact(data) {
        try {
           //TODO: pending backend endpoint
            console.log(data);
          } catch (exception) {
            console.error("Hubo un error en la respuesta del servidor. Error: " + exception.msg)
            throw exception;
          }
    }
}