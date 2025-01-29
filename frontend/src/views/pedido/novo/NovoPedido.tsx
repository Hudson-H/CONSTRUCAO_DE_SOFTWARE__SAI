import { useNavigate } from "react-router-dom";
import { Title } from "../../../components/atoms/Title/Title";
import PedidoForm, { pedidoFormData } from "../../../components/organisms/PedidoForm/PedidoForm";
import { toast } from "react-toastify";
import PedidoService from "../../../services/PedidoService";
import { SearchListRow } from "../../../components/organisms/SearchList/SearchList";

export function NovoPedido() {
  const navigate = useNavigate();

  async function handleNew({ valor, informacoes }: pedidoFormData, itemData: SearchListRow[]) {
    try {
      const response = await PedidoService.add({
        valor,
        informacoes,
        items: itemData.map((item) => {
          return {
            id: item.key,
            nome: item.name,
            preco: item.price??0,
            adicionais: item.additionals?.map((adicional) => {
              return {
                id: adicional.key,
                nome: adicional.name,
                preco: adicional.price??0,
                quantidade: adicional.amount??0,
              };
            })??[]
          };
        }),
      });

      console.log(response);

      toast.info("Pedido adicionado com sucesso!");
      navigate(`/pedido/${response.id}`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Novo Pedido</Title>

    <PedidoForm onSubmit={handleNew}></PedidoForm>
  </div>
}