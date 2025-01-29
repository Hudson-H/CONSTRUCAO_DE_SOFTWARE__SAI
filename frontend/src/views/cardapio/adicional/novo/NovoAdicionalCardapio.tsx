import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import AdicionalCardapioForm, { adicionalCardapioFormData } from "../../../../components/organisms/AdicionalCardapioForm/AdicionalCardapioForm";
import AdicionalCardapioService from "../../../../services/AdicionalCardapioService";

export function NovoAdicionalCardapio() {
  const navigate = useNavigate();

  async function handleNew({ nome, valor, item, quantidade }: adicionalCardapioFormData) {
    try {
      const response = await AdicionalCardapioService.add({
        nome,
        valor,
        item: item,
        quantidade
      });

      toast.info("Adicional adicionado com sucesso!");
      navigate(`/cardapio?category=adicional`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

  }

  return <div>
    <Title>Novo Adicional do Cardápio</Title>

    <AdicionalCardapioForm onSubmit={handleNew} />
  </div>
}