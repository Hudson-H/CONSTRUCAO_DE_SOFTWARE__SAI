export default interface ILancamentoEstoque {
  id: string;
  quantidade: number;
  dataCompra: Date;
  dataValidade?: Date;
  item: string;
}