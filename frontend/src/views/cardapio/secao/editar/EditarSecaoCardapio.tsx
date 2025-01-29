import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import SecaoCardapioForm, { secaoCardapioFormData } from "../../../../components/organisms/SecaoCardapioForm/SecaoCardapioForm";
import SecaoCardapioService from "../../../../services/SecaoCardapioService";
import { useState, useEffect } from "react";
import ISecaoCardapio from "../../../../utils/interfaces/secaoCardapio";

export function EditarSecaoCardapio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [secaoCardapio, setSecaoCardapio] = useState<ISecaoCardapio>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const item = await SecaoCardapioService.get(id);

        setSecaoCardapio(item);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({ nome, descricao }: secaoCardapioFormData) {
    try {
      const response = await SecaoCardapioService.update({
        id: secaoCardapio!.id,
        nome,
        descricao,
      });

      toast.info("Seção salva com sucesso!");
      navigate(`/cardapio?category=secao`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Editar Seção do Cardápio</Title>

    <SecaoCardapioForm onSubmit={handleSave} data={secaoCardapio}/>
  </div>
}