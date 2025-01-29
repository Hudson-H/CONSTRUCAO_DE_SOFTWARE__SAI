import { Title } from "../../../components/atoms/Title/Title";
import PedidoForm from "../../../components/organisms/PedidoForm/PedidoForm";

export function NovoPedido() {
  return <div>
    <Title>Novo Pedido</Title>

    <PedidoForm onSubmit={console.log}></PedidoForm>
  </div>
}