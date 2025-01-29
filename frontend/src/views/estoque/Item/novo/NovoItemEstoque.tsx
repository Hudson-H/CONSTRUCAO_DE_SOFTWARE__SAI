import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import AdicionalCardapioForm, { adicionalCardapioFormData } from "../../../../components/organisms/AdicionalCardapioForm/AdicionalCardapioForm";
import AdicionalCardapioService from "../../../../services/AdicionalCardapioService";
import ItemEstoqueService from "../../../../services/ItemEstoqueService";
import ItemEstoqueForm, { itemEstoqueFormData } from "../../../../components/organisms/ItemEstoqueForm/ItemEstoqueForm";

export function NovoItemEstoque() {
  const navigate = useNavigate();

  async function handleNew({
    nome,
    categoria,
    descricao,
    estrategiaControle,
    tipoUnidade
  }: itemEstoqueFormData) {
    try {
      const response = await ItemEstoqueService.add({
        nome,
        categoria,
        descricao,
        estrategiaControle,
        tipoUnidade
      });

      toast.info("Item adicionado com sucesso!");
      navigate(`/estoque?category=item`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

  }

  return <div>
    <Title>Novo Item do Estoque</Title>

    <ItemEstoqueForm onSubmit={handleNew} />
  </div>
}