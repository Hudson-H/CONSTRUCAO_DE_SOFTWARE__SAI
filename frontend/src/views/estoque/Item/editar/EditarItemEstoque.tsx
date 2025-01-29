import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import ItemEstoqueService from "../../../../services/ItemEstoqueService";
import ItemEstoqueForm, {
  itemEstoqueFormData,
} from "../../../../components/organisms/ItemEstoqueForm/ItemEstoqueForm";
import { useState, useEffect } from "react";
import IItemEstoque from "../../../../utils/interfaces/itemEstoque";

export function EditarItemEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemEstoque, setItemEstoque] = useState<IItemEstoque>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const item = await ItemEstoqueService.get(id);

        setItemEstoque(item);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({
    nome,
    categoria,
    descricao,
    estrategiaControle,
    tipoUnidade,
  }: itemEstoqueFormData) {
    try {
      const response = await ItemEstoqueService.update({
        id: itemEstoque!.id,
        nome,
        categoria,
        descricao,
        estrategiaControle,
        tipoUnidade,
      });

      toast.info("Item salvo com sucesso!");
      navigate(`/estoque?category=item`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    <div>
      <Title>Editar Item do Estoque</Title>

      <ItemEstoqueForm onSubmit={handleSave} data={itemEstoque} />
    </div>
  );
}
