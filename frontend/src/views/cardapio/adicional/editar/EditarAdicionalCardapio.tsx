import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import AdicionalCardapioService from "../../../../services/AdicionalCardapioService";
import IAdicionalCardapio from "../../../../utils/interfaces/adicionalCardapio";
import AdicionalCardapioForm, { adicionalCardapioFormData } from "../../../../components/organisms/AdicionalCardapioForm/AdicionalCardapioForm";

export function EditarAdicionalCardapio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adicionalCardapio, setAdicionalCardapio] = useState<IAdicionalCardapio>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const item = await AdicionalCardapioService.get(id);

        setAdicionalCardapio(item);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({ nome, valor, item, quantidade }: adicionalCardapioFormData) {
    try {
      const response = await AdicionalCardapioService.update({
        id: adicionalCardapio!.id,
        nome,
        valor,
        item,
        quantidade
      });

      toast.info("Adicional salva com sucesso!");
      navigate(`/cardapio?category=adicional`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Editar Seção do Cardápio</Title>

{/* @ts-ignore */}
    <AdicionalCardapioForm onSubmit={handleSave} data={adicionalCardapio}/>
  </div>
}