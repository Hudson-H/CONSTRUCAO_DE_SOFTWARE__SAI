import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import ISecaoCardapio from "../utils/interfaces/secaoCardapio";

let secaoCardapioData: ISecaoCardapio[] = [
  {
    id: "0",
    nome: "Secao 1",
    descricao: "Descrição da seção 1",
  },
];

const SecaoCardapioService = {
  list: async (): Promise<ISecaoCardapio[]> => {
    return secaoCardapioData;

    try {
      const response = await api.get("/cardapio/secao");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar as seções do cardápio");
    }
  },

  get: async (id: string): Promise<ISecaoCardapio> => {
    return secaoCardapioData.filter(secao => secao.id === id)[0];

    try {
      const response = await api.get(`/cardapio/secao/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar a seção do cardápio");
    }
  },

  add: async (secao: ISecaoCardapio): Promise<ISecaoCardapio> => {
    secaoCardapioData.unshift(secao);
    return secaoCardapioData[0];

    try {
      const response = await api.post("/cardapio/secao", secao);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar a seção do cardápio");
    }
  },

  update: async (secao: ISecaoCardapio): Promise<ISecaoCardapio> => {
    secaoCardapioData = secaoCardapioData.map((secaoData) => {
      if (secaoData.id === secao.id) {
        return secao;
      }
      return secaoData;
    });
    return secao;

    try {
      const response = await api.put(`/cardapio/secao/${secao.id}`, secao);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar a seção do cardápio");
    }
  },

  delete: async (id: string): Promise<void> => {
    secaoCardapioData = secaoCardapioData.filter((secao) => secao.id !== id);
    return;

    try {
      await api.delete(`/cardapio/secao/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar a seção do cardápio");
    }
  }
};

export default SecaoCardapioService;