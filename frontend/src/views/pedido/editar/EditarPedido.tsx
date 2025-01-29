import { Link, useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../components/atoms/Title/Title";
import PedidoForm, {
  pedidoFormData,
} from "../../../components/organisms/PedidoForm/PedidoForm";
import { toast } from "react-toastify";
import PedidoService from "../../../services/PedidoService";
import { SearchListRow } from "../../../components/organisms/SearchList/SearchList";
import { useState, useEffect } from "react";
import ItemEstoqueService from "../../../services/ItemEstoqueService";
import IItemEstoque from "../../../utils/interfaces/itemEstoque";
import IPedido from "../../../utils/interfaces/pedido";
import PedidoPgtoForm, { pedidoPgtoFormData } from "../../../components/organisms/PedidoPgtoForm/PedidoPgtoForm";
import { Label } from "../../../components/atoms/Label/Label";
import { SmileyWink } from "@phosphor-icons/react";
import Button from "../../../components/atoms/Button/Button";

export function EditarPedido() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState<IPedido>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const pedido = await PedidoService.get(id);

        setPedido(pedido);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave(
    {
      formaPagamento,
      troco,
      valorRecebido
    }: pedidoPgtoFormData,
  ) {
    try {
      const response = await PedidoService.update({
        ...pedido!,
        estado: "EM_ESPERA",
        formaPgto: formaPagamento,
        troco,
        valorPago: valorRecebido,
      });

      console.log(response);

      toast.info("Pedido alterado com sucesso!");
      navigate(`/pedido/${response.id}`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    pedido?.estado === "ESPERANDO_PGTO" ?
      <div>
        <Title>Pagamento</Title>

        <PedidoPgtoForm onSubmit={handleSave} data={pedido}></PedidoPgtoForm>
      </div>
      :
    pedido?.estado === "EM_ESPERA" ?
      <div className="w-full h-full grid place-items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <SmileyWink size={64} className="text-gray-300" />
          <Title>Pedido Realizado com Sucesso</Title>
          <Label light>Senha: {pedido?.senha}</Label>
          <Link to={"/pedido?category=emEspera"}>
            <Button color="blue">Finalizar</Button>
          </Link>
        </div>
      </div>
      : <></>
  );
}
