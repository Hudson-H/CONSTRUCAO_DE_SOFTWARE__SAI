import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IAdicionalCardapio from "../utils/interfaces/adicionalCardapio";

let adicionalCardapioData: IAdicionalCardapio[] = [
  {
    id: "0",
    nome: "Adicional 1",
    valor: 10,
  },
  {
    id: "1",
    nome: "Adicional 2",
    valor: 20,
  },
  {
    id: "2",
    nome: "Adicional 3",
    valor: 30,
  }
]

const AdicionalCardapioService = {
  list: async (): Promise<IAdicionalCardapio[]> => {
    return adicionalCardapioData;

    try {
      const response = await api.get("/cardapio/adicional");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar os adicionais do cardápio");
    }
  },

  get: async (id: string): Promise<IAdicionalCardapio> => {
    return adicionalCardapioData.filter(adicional => adicional.id === id)[0];

    try {
      const response = await api.get(`/cardapio/adicional/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o adicional do cardápio");
    }
  },

  add: async (adicional: IAdicionalCardapio): Promise<IAdicionalCardapio> => {
    adicionalCardapioData.unshift(adicional);
    return adicionalCardapioData[0];

    try {
      const response = await api.post("/cardapio/adicional", adicional);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar o adicional do cardápio");
    }
  },

  update: async (adicional: IAdicionalCardapio): Promise<IAdicionalCardapio> => {
    adicionalCardapioData[adicionalCardapioData.findIndex(item => item.id === adicional.id)] = adicional;
    return adicionalCardapioData[adicionalCardapioData.findIndex(item => item.id === adicional.id)];

    try {
      const response = await api.put(`/cardapio/adicional/${adicional.id}`, adicional);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar o adicional do cardápio");
    }
  },

  delete: async (id: string): Promise<void> => {
    adicionalCardapioData = adicionalCardapioData.filter(c => c.id !== id);
    return;

    try {
      await api.delete(`/cardapio/adicional/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar o adicional do cardápio");
    }
  }
}

export default AdicionalCardapioService;