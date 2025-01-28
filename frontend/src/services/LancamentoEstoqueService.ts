import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import ILancamentoEstoque from "../utils/interfaces/lancamentoEstoque";

let lancamentoEstoqueData: ILancamentoEstoque[] = [
  {
    id: "0",
    item: "Item 1",
    quantidade: 10,
    dataCompra: new Date(),
  },
  {
    id: "0",
    item: "Item 1",
    quantidade: 10,
    dataCompra: new Date(),
  },
  {
    id: "1",
    item: "Item 2",
    quantidade: 20,
    dataCompra: new Date(),
  },
  {
    id: "2",
    item: "Item 3",
    quantidade: 30,
    dataCompra: new Date(),
  }
]

const LancamentoEstoqueService = {
  list: async (): Promise<ILancamentoEstoque[]> => {
    return lancamentoEstoqueData;

    try {
      const response = await api.get("/estoque/lancamento");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar os lançamentos de estoque");
    }
  },

  get: async (id: string): Promise<ILancamentoEstoque> => {
    return lancamentoEstoqueData.filter(lancamento => lancamento.id === id)[0];

    try {
      const response = await api.get(`/estoque/lancamento/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o lançamento de estoque");
    }
  },

  add: async (lancamento: ILancamentoEstoque): Promise<ILancamentoEstoque> => {
    lancamentoEstoqueData.unshift(lancamento);
    return lancamentoEstoqueData[0];

    try {
      const response = await api.post("/estoque/lancamento", lancamento);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar o lançamento de estoque");
    }
  },

  update: async (lancamento: ILancamentoEstoque): Promise<ILancamentoEstoque> => {
    const index = lancamentoEstoqueData.findIndex(item => item.id === lancamento.id);
    lancamentoEstoqueData[index] = lancamento;
    return lancamento;

    try {
      const response = await api.put(`/estoque/lancamento/${lancamento.id}`, lancamento);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar o lançamento de estoque");
    }
  },

  delete: async (id: string): Promise<void> => {
    lancamentoEstoqueData = lancamentoEstoqueData.filter(lancamento => lancamento.id !== id);
    return;

    try {
      await api.delete(`/estoque/lancamento/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar o lançamento de estoque");
    }
  }
}

export default LancamentoEstoqueService;