export default interface IPedido {
  id: string;
  senha: string;
  valor: string;
  dataPedido: Date;
  estado: string;
  informacoes: string;
  dataEmissaoPgto: Date;
  dataPgto: Date;
  formaPgto: string;
  valorTotal: string;
  valorPago: string;
  troco: string;
  items: {
    id: string,
    nome: string,
    preco: number,
    adicionais: {
      id: string,
      nome: string,
      quantidade: number
    }[]
  }[]
}