export default interface LancamentoEstoqueService {
  id: string;
  quantidade: number;
  dataCompra: string;
  dataValidade?: string;
  item: string;
}