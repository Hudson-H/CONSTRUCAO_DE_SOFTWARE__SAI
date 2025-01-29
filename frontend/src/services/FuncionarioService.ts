import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IFuncionario from "./Funcionario";

let UUID = 0;
type AddFuncionarioRequest = Omit<IFuncionario, "id">;

let funcionarioData: IFuncionario[] = [
  {
    id: "0",
    nome: "Funcionario 1",
    sexo: "M",
    dataInicio: new Date(),
    salario: 1000,
    endereco: "Rua 1",
  },
  {
    id: "1",
    nome: "Funcionario 2",
    sexo: "M",
    dataInicio: new Date(),
    salario: 2000,
    endereco: "Rua 2",
  },
  {
    id: "2",
    nome: "Funcionario 3",
    sexo: "M",
    dataInicio: new Date(),
    salario: 3000,
    endereco: "Rua 3",
  },
];

const FuncionarioService = {
  list: async (): Promise<IFuncionario[]> => {
    return funcionarioData;

    try {
      const response = await api.get("/cardapio/funcionario");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(
        err,
        "Ocorreu um erro ao tentar listar as seções do cardápio"
      );
    }
  },

  get: async (id: string): Promise<IFuncionario> => {
    return funcionarioData.filter((funcionario) => funcionario.id === id)[0];

    try {
      const response = await api.get(`/cardapio/funcionario/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(
        err,
        "Ocorreu um erro ao tentar buscar a seção do cardápio"
      );
    }
  },

  add: async (funcionario: AddFuncionarioRequest): Promise<IFuncionario> => {
    funcionarioData.unshift({
      id: (UUID++).toString(),
      ...funcionario,
    });
    return funcionarioData[0];

    try {
      const response = await api.post("/cardapio/funcionario", funcionario);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(
        err,
        "Ocorreu um erro ao tentar adicionar a seção do cardápio"
      );
    }
  },

  update: async (funcionario: IFuncionario): Promise<IFuncionario> => {
    funcionarioData = funcionarioData.map((funcionarioData) => {
      if (funcionarioData.id === funcionario.id) {
        return funcionario;
      }
      return funcionarioData;
    });
    return funcionario;

    try {
      const response = await api.put(
        `/cardapio/funcionario/${funcionario.id}`,
        funcionario
      );

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(
        err,
        "Ocorreu um erro ao tentar atualizar a seção do cardápio"
      );
    }
  },

  delete: async (id: string): Promise<void> => {
    funcionarioData = funcionarioData.filter(
      (funcionario) => funcionario.id !== id
    );
    return;

    try {
      await api.delete(`/cardapio/funcionario/${id}`);
    } catch (err) {
      throw handleApiAxiosError(
        err,
        "Ocorreu um erro ao tentar deletar a seção do cardápio"
      );
    }
  },
};

export default FuncionarioService;
