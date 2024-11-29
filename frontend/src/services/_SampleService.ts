import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";

/* eslint-disable @typescript-eslint/no-unused-vars */
const _SampleService = {
  example: async (body: object): Promise<void> => {
    try {
      const response = await api.get("/example", body);

      return;
    } catch (err) {
      throw handleApiAxiosError(err, "Erro");
    }
  },
}

export default _SampleService;