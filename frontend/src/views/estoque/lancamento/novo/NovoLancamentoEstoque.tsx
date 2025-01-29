import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import LancamentoEstoqueService from "../../../../services/LancamentoEstoqueService";
import LancamentoEstoqueForm, { lancamentoEstoqueFormData } from "../../../../components/organisms/LancamentoEstoqueForm/LancamentoEstoqueForm";

export function NovoLancamentoEstoque() {
  const navigate = useNavigate();

  async function handleNew({
    dataCompra,
    dataValidade,
    item,
    quantidade,
  }: lancamentoEstoqueFormData) {
    try {
      const response = await LancamentoEstoqueService.add({
        dataCompra,
        dataValidade,
        item: item,
        quantidade,
      });

      toast.info("Lançamento adicionado com sucesso!");
      navigate(`/estoque?category=estoque`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    <div>
      <Title>Novo Lancamento do Estoque</Title>

      <LancamentoEstoqueForm onSubmit={handleNew} />
    </div>
  );
}
