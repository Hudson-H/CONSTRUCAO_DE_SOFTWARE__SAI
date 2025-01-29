export default interface IPedido {
  id: string;
  senha: number;
  valor: number;
  dataPedido: Date;
  estado: string;
  informacoes: string;
  dataEmissaoPgto?: Date;
  dataPgto?: Date;
  formaPgto?: string;
  valorTotal: number;
  valorPago: number;
  troco: number;
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
}