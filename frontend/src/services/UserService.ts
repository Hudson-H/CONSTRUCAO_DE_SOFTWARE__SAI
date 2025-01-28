import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IUser from "../utils/interfaces/user";
import { Permission } from "../utils/types/permission";

type CurrentUserResponse = IUser & {
  permissions: Permission[]
};

const UserService = {
  currentUser: async (): Promise<CurrentUserResponse> => {
    return {
      id: "0",
      name: "Teste",
      permissions: ["Estoque"],
    }

    try {
      const response = await api.get("/users/me");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o usuário");
    }
  }
}

export default UserService;