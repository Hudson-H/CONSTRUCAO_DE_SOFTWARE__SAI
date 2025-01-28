export default interface IItemEstoque {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  estrategiaControle?: string;
  unidadeMedida: string;
}