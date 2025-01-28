import IItemEstoque from "./itemEstoque";

export default interface IItemCardapio {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  compostoPor: { item: IItemEstoque, quatidade: number }[];
}