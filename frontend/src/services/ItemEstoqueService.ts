import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IItemEstoque from "../utils/interfaces/itemEstoque";

let itemEstoqueData: IItemEstoque[] = [
  {
    id: "0",
    categoria: "Categoria 1",
    descricao: "Descrição do item 1",
    nome: "Item 1",
    tipoUnidade: {
      id: "0",
      nome: "Un",
      sigla: "Un"
    }
  },
  {
    id: "1",
    categoria: "Categoria 2",
    descricao: "Descrição do item 2",
    nome: "Item 2",
    tipoUnidade: {
      id: "0",
      nome: "Un",
      sigla: "Un"
    }
  },
  {
    id: "2",
    categoria: "Categoria 3",
    descricao: "Descrição do item 3",
    nome: "Item 3",
    tipoUnidade: {
      id: "0",
      nome: "Un",
      sigla: "Un"
    }
  }
];

const ItemEstoqueService = {
  list: async (): Promise<IItemEstoque[]> => {
    return itemEstoqueData;

    try {
      const response = await api.get("/estoque/item");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar os itens de estoque");
    }
  },

  get: async (id: string): Promise<IItemEstoque> => {
    return itemEstoqueData.filter(item => item.id === id)[0];

    try {
      const response = await api.get(`/estoque/item/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o item de estoque");
    }
  },

  add: async (item: IItemEstoque): Promise<IItemEstoque> => {
    itemEstoqueData.unshift(item);
    return itemEstoqueData[0];

    try {
      const response = await api.post("/estoque/item", item);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar o item de estoque");
    }
  },

  update: async (item: IItemEstoque): Promise<IItemEstoque> => {
    itemEstoqueData = itemEstoqueData.map(itemData => itemData.id === item.id ? item : itemData);
    return item;

    try {
      const response = await api.put(`/estoque/item/${item.id}`, item);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar o item de estoque");
    }
  },

  delete: async (id: string): Promise<void> => {
    itemEstoqueData = itemEstoqueData.filter(item => item.id !== id);
    return;

    try {
      await api.delete(`/estoque/item/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar o item de estoque");
    }
  },

  search: async (search: string): Promise<IItemEstoque[]> => {
    return itemEstoqueData.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()));

    try {
      const response = await api.get(`/estoque/item/search?search=${search}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o item de estoque");
    }
  }
}

export default ItemEstoqueService;