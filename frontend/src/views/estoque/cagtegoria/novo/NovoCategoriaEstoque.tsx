import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import CategoriaiEstoqueForm, { categoriaEstoqueFormData } from "../../../../components/organisms/CategoriaEstoqueForm/CategoriaEstoqueForm";
import CategoriaEstoqueService from "../../../../services/CategoriaEstoqueService";

export function NovoCategoriaEstoque() {
  const navigate = useNavigate();

  async function handleNew({ nome, descricao }: categoriaEstoqueFormData) {
    try {
      const response = await CategoriaEstoqueService.add({
        nome,
        descricao
      });

      toast.info("Categoria adicionado com sucesso!");
      navigate(`/estoque?category=categoria`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

  }

  return <div>
    <Title>Nova Categoria do Estoque</Title>

    <CategoriaiEstoqueForm onSubmit={handleNew} />
  </div>
}