import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import CategoriaEstoqueForm, { categoriaEstoqueFormData } from "../../../../components/organisms/CategoriaEstoqueForm/CategoriaEstoqueForm";
import CategoriaEstoqueService from "../../../../services/CategoriaEstoqueService";
import TipoUnidadeForm, { tipoUnidadeFormData } from "../../../../components/organisms/TipoUnidadeForm/TipoUnidadeForm";
import TipoUnidadeService from "../../../../services/TipoUnidadeService";

export function NovoTipoUnidadeEstoque() {
  const navigate = useNavigate();

  async function handleNew({ nome, sigla }: tipoUnidadeFormData) {
    try {
      const response = await TipoUnidadeService.add({
        nome,
        sigla
      });

      toast.info("Tipo Unidade adicionado com sucesso!");
      navigate(`/estoque?category=tipoUnidade`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

  }

  return <div>
    <Title>Novo Tipo Unidade</Title>

    <TipoUnidadeForm onSubmit={handleNew} />
  </div>
}