import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import ITipoUnidade from "../utils/interfaces/tipoUnidade";

let UUID = 0;
type AddTipoUnidadeRequest = Omit<ITipoUnidade, "id">;

let tipoUnidadeData: ITipoUnidade[] = [
  {
    id: "0",
    nome: "Kilos",
    sigla: "kg."
  },
]

const TipoUnidadeService = {
  list: async (): Promise<ITipoUnidade[]> => {
    return tipoUnidadeData;

    try {
      const response = await api.get("/cardapio/adicional");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar os adicionais do cardápio");
    }
  },

  get: async (id: string): Promise<ITipoUnidade> => {
    return tipoUnidadeData.filter(adicional => adicional.id === id)[0];

    try {
      const response = await api.get(`/cardapio/adicional/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o adicional do cardápio");
    }
  },

  add: async (adicional: AddTipoUnidadeRequest): Promise<ITipoUnidade> => {
    tipoUnidadeData.unshift({
      id: (UUID++).toString(),
      ...adicional,
    });
    return tipoUnidadeData[0];

    try {
      const response = await api.post("/cardapio/adicional", adicional);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar o adicional do cardápio");
    }
  },

  update: async (adicional: ITipoUnidade): Promise<ITipoUnidade> => {
    tipoUnidadeData[tipoUnidadeData.findIndex(item => item.id === adicional.id)] = adicional;
    return tipoUnidadeData[tipoUnidadeData.findIndex(item => item.id === adicional.id)];

    try {
      const response = await api.put(`/cardapio/adicional/${adicional.id}`, adicional);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar o adicional do cardápio");
    }
  },

  delete: async (id: string): Promise<void> => {
    tipoUnidadeData = tipoUnidadeData.filter(c => c.id !== id);
    return;

    try {
      await api.delete(`/cardapio/adicional/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar o adicional do cardápio");
    }
  },

  search: async (search: string): Promise<ITipoUnidade[]> => {
    return tipoUnidadeData.filter(tipo => tipo.nome.toLowerCase().includes(search.toLowerCase()));

    try {
      const response = await api.get(`/estoque/item/search?search=${search}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o item de estoque");
    }
  }


}

export default TipoUnidadeService;