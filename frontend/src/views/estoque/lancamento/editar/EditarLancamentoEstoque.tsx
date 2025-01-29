import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import AdicionalCardapioService from "../../../../services/AdicionalCardapioService";
import IAdicionalCardapio from "../../../../utils/interfaces/adicionalCardapio";
import AdicionalCardapioForm, { adicionalCardapioFormData } from "../../../../components/organisms/AdicionalCardapioForm/AdicionalCardapioForm";
import ILancamentoEstoque from "../../../../utils/interfaces/lancamentoEstoque";
import LancamentoEstoqueService from "../../../../services/LancamentoEstoqueService";
import LancamentoEstoqueForm, { lancamentoEstoqueFormData } from "../../../../components/organisms/LancamentoEstoqueForm/LancamentoEstoqueForm";

export function EditarLancamentoEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lancamentoEstoque, setLancamentoEstoque] = useState<ILancamentoEstoque>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const item = await LancamentoEstoqueService.get(id);

        setLancamentoEstoque(item);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({ dataCompra, dataValidade, item, quantidade }: lancamentoEstoqueFormData) {
    try {
      const response = await LancamentoEstoqueService.update({
        id: lancamentoEstoque!.id,
        dataCompra,
        dataValidade,
        item,
        quantidade
      });

      toast.info("Lançamento salvo com sucesso!");
      navigate(`/estoque?category=lancamento`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Editar Lancamento do estoque</Title>

    <LancamentoEstoqueForm onSubmit={handleSave} data={lancamentoEstoque}/>
  </div>
}