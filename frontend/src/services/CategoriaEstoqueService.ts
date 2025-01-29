import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import ICategoriaEstoque from "../utils/interfaces/categoriaEstoque";

let categoriaEstoqueData: ICategoriaEstoque[] = [
  {
    id: "0",
    nome: "Categoria 1",
    descricao: "Descrição da categoria 1",
  },
  {
    id: "1",
    nome: "Categoria 2",
    descricao: "Descrição da categoria 2",
  },
  {
    id: "2",
    nome: "Categoria 3",
    descricao: "Descrição da categoria 3",
  }
];

const CategoriaEstoqueService = {
  list: async (): Promise<ICategoriaEstoque[]> => {
    return categoriaEstoqueData;

    try {
      const response = await api.get("/estoque/categoria");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar as categorias de estoque");
    }
  },

  get: async (id: string): Promise<ICategoriaEstoque> => {
    return categoriaEstoqueData.filter(categoria => categoria.id === id)[0];

    try {
      const response = await api.get(`/estoque/categoria/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar a categoria de estoque");
    }
  },

  add: async (categoria: ICategoriaEstoque): Promise<ICategoriaEstoque> => {
    categoriaEstoqueData.unshift(categoria);
    return categoriaEstoqueData[0];

    try {
      const response = await api.post("/estoque/categoria", categoria);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar a categoria de estoque");
    }
  },

  update: async (categoria: ICategoriaEstoque): Promise<ICategoriaEstoque> => {
    categoriaEstoqueData = categoriaEstoqueData.map(c => c.id === categoria.id ? categoria : c);
    return categoria;

    try {
      const response = await api.put(`/estoque/categoria/${categoria.id}`, categoria);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar a categoria de estoque");
    }
  },

  delete: async (id: string): Promise<void> => {
    categoriaEstoqueData = categoriaEstoqueData.filter(c => c.id !== id);
    return;

    try {
      await api.delete(`/estoque/categoria/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar a categoria de estoque");
    }
  },

  search: async (search: string): Promise<ICategoriaEstoque[]> => {
    return categoriaEstoqueData.filter(categoria => categoria.nome.toLowerCase().includes(search.toLowerCase()));

    try {
      const response = await api.get(`/estoque/categoria/search?search=${search}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o categoria de estoque");
    }
  }
}

export default CategoriaEstoqueService;