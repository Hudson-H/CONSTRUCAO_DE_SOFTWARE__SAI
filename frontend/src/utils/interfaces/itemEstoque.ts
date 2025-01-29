export default interface IItemEstoque {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  estrategiaControle?: string;
  tipoUnidade: {
    id: string;
    nome: string;
    sigla: string;
  };
}