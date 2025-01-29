import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import IPedido from "../utils/interfaces/pedido";

let UUID = 0;
type AddPedidoRequest = {
  informacoes: string;
  valor: number;
  items: {
    id: string,
    nome: string,
    preco: number,
    adicionais: {
      id: string,
      nome: string,
      preco: number,
      quantidade: number
    }[]
  }[]
};

let pedidoData: IPedido[] = [
];

const PedidoService = {
  list: async (estado?: string): Promise<IPedido[]> => {
    if (estado) {
      return pedidoData.filter(item => item.estado === estado);
    } else {
      return pedidoData;
    }

    try {
      const response = await api.get("/cardapio/item");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar listar os itens do cardápio");
    }
  },

  get: async (id: string): Promise<IPedido> => {
    return pedidoData.filter(item => item.id === id)[0];

    try {
      const response = await api.get(`/cardapio/item/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o item do cardápio");
    }
  },

  add: async (item: AddPedidoRequest): Promise<IPedido> => {
    console.log(item);

    const novoItem: IPedido = {
      id: (UUID++).toString(),
      senha: (UUID++),
      informacoes: item.informacoes,
      valor: item.valor,
      valorTotal: item.valor,
      dataEmissaoPgto: undefined,
      dataPgto: undefined,
      dataPedido: new Date(),
      estado: "ESPERANDO_PGTO",
      troco: 0,
      formaPgto: undefined,
      valorPago: 0,
      items: item.items,
    }

    pedidoData.unshift(novoItem);
    return pedidoData[0];

    try {
      const response = await api.post("/cardapio/item", item);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar adicionar o item do cardápio");
    }
  },

  update: async (item: IPedido): Promise<IPedido> => {
    if (item.estado !== "ESPERANDO_PGTO") {
      if (item.valorPago < item.valorTotal) {
        throw new Error("O valor pago é menor que o valor total do pedido");
      }
    }

    pedidoData = pedidoData.map(c => c.id === item.id ? item : c);
    return item;

    try {
      const response = await api.put(`/cardapio/item/${item.id}`, item);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar atualizar o item do cardápio");
    }
  },

  delete: async (id: string): Promise<void> => {
    pedidoData = pedidoData.filter(c => c.id !== id);
    return;

    try {
      await api.delete(`/cardapio/item/${id}`);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar deletar o item do cardápio");
    }
  },

  search: async (search: string): Promise<IPedido[]> => {
    return pedidoData.filter(item => item.senha.toString().includes(search.toLowerCase()));

    try {
      const response = await api.get(`/estoque/item/search?search=${search}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar buscar o item de estoque");
    }
  }
}

export default PedidoService;