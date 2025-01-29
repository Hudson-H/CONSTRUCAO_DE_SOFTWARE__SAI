import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import { useState, useEffect } from "react";
import ISecaoCardapio from "../../../../utils/interfaces/secaoCardapio";
import ICategoriaEstoque from "../../../../utils/interfaces/categoriaEstoque";
import CategoriaEstoqueService from "../../../../services/CategoriaEstoqueService";
import CategoriaiEstoqueForm from "../../../../components/organisms/CategoriaEstoqueForm/CategoriaEstoqueForm";

export function EditarCategoriaEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoriaEstoque, setCategoriaEstoque] = useState<ICategoriaEstoque>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const categoria = await CategoriaEstoqueService.get(id);

        setCategoriaEstoque(categoria);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({ nome, descricao }: secaoCardapioFormData) {
    try {
      const response = await CategoriaEstoqueService.update({
        id: categoriaEstoque!.id,
        nome,
        descricao,
      });

      toast.info("Seção salva com sucesso!");
      navigate(`/estoque?category=categoria`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Editar Categoria do Estoque</Title>

    <CategoriaiEstoqueForm onSubmit={handleSave} data={categoriaEstoque}/>
  </div>
}