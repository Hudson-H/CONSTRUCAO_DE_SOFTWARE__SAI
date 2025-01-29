export default interface IAdicionalCardapio {
  id: string;
  nome: string;
  valor: number;
  item: {
    id: string;
    nome: string;
  };
  quantidade: number;
}