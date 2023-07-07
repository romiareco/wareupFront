import { ENV } from "../utils";

export class Storage {
    baseApi = ENV.BASE_API;

    async register(data) {
        try {
           //TODO: pending backend endpoint
            console.log(data);
          } catch (exception) {
            console.error("Hubo un error en la respuesta del servidor. Error: " + exception.msg)
            throw exception;
          }
    }
}