import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import { useState, useEffect } from "react";
import ISecaoCardapio from "../../../../utils/interfaces/secaoCardapio";
import ICategoriaEstoque from "../../../../utils/interfaces/tipoUnidade";
import CategoriaEstoqueService from "../../../../services/CategoriaEstoqueService";
import CategoriaEstoqueForm from "../../../../components/organisms/CategoriaEstoqueForm/CategoriaEstoqueForm";
import ITipoUnidade from "../../../../utils/interfaces/tipoUnidade";
import TipoUnidadeService from "../../../../services/TipoUnidadeService";
import TipoUnidadeForm, { tipoUnidadeFormData } from "../../../../components/organisms/TipoUnidadeForm/TipoUnidadeForm";

export function EditarTipoUnidadeEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tipoUnidade, setTipoUnidade] = useState<ITipoUnidade>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const tipo = await TipoUnidadeService.get(id);

        setTipoUnidade(tipo);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({ nome, sigla }: tipoUnidadeFormData) {
    try {
      const response = await TipoUnidadeService.update({
        id: tipoUnidade!.id,
        nome,
        sigla,
      });

      toast.info("TIpo Unidade salvo com sucesso!");
      navigate(`/estoque?category=tipoUnidade`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Editar Categoria do Estoque</Title>

    <TipoUnidadeForm onSubmit={handleSave} data={tipoUnidade}/>
  </div>
}