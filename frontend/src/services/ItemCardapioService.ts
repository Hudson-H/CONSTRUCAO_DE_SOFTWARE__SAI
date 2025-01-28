import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IItemCardapio from "../utils/interfaces/itemCardapio";

let itemCardapioData: IItemCardapio[] = [
  {
    id: "0",
    nome: "Item 1",
    descricao: "Descrição do item 1",
    valor: 10,
    compostoPor: [
      {
        item: {
          id: "0",
          categoria: "Categoria 1",
          descricao: "Descrição do item 1",
          nome: "Item 1",
          unidadeMedida: "Un"
        },
        quatidade: 1
      }
    ]
  },
];

const ItemCardapioService = {
  list: async (): Promise<IItemCardapio[]> => {
    return itemCardapioData;

    try {
      const response = await api.get("/cardapio/item");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar os itens do cardápio");
    }
  },

  get: async (id: string): Promise<IItemCardapio> => {
    return itemCardapioData.filter(item => item.id === id)[0];

    try {
      const response = await api.get(`/cardapio/item/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o item do cardápio");
    }
  },

  add: async (item: IItemCardapio): Promise<IItemCardapio> => {
    itemCardapioData.unshift(item);
    return itemCardapioData[0];

    try {
      const response = await api.post("/cardapio/item", item);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar o item do cardápio");
    }
  },

  update: async (item: IItemCardapio): Promise<IItemCardapio> => {
    itemCardapioData = itemCardapioData.map(c => c.id === item.id ? item : c);
    return item;

    try {
      const response = await api.put(`/cardapio/item/${item.id}`, item);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar o item do cardápio");
    }
  },

  delete: async (id: string): Promise<void> => {
    itemCardapioData = itemCardapioData.filter(c => c.id !== id);
    return;

    try {
      await api.delete(`/cardapio/item/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar o item do cardápio");
    }
  }
}

export default ItemCardapioService;