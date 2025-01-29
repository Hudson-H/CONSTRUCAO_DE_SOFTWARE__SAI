export default interface IItemCardapio {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  compostoPor: { item: {
    id: string,
    nome: string
  }, quantidade: number }[];
}