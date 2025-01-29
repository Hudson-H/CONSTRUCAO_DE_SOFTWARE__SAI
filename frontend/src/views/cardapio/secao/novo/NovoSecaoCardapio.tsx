import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";

export function NovoSecaoCardapio() {
  const navigate = useNavigate();

  async function handleNew({ nome, descricao }: secaoCardapioFormData) {
    try {
      const response = await SecaoCardapioService.add({
        nome,
        descricao,
      });

      toast.info("Seção adicionado com sucesso!");
      navigate(`/cardapio?category=secao`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

  }

  return <div>
    <Title>Nova Seção do Cardápio</Title>

    <SecaoCardapioForm onSubmit={handleNew} />
  </div>
}