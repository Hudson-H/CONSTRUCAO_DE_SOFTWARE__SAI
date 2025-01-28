import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IToken from "../utils/interaces/token";

const AuthService = {
  login: async (login: string, password: string): Promise<IToken> => {
    return {
      token: "1234567890",
    }

    try {
      const response = await api.post("/login", {
        login,
        password
      });

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar logar-se");
    }
  },
}

export default AuthService;