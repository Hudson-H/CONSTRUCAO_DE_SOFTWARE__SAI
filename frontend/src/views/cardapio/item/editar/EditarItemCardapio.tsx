import { z } from "zod";
import { Title } from "../../../../components/atoms/Title/Title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/atoms/Button/Button";
import Input from "../../../../components/atoms/Input/Input";
import { Label } from "../../../../components/atoms/Label/Label";
import { FormField } from "../../../../components/molecules/FormField/FormField";
import ItemCardapioService from "../../../../services/ItemCardapioService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import SearchList, {
  SearchListRow,
} from "../../../../components/organisms/SearchList/SearchList";
import debounce from "../../../../utils/debounce";
import ItemEstoqueService from "../../../../services/ItemEstoqueService";
import ItemCardapioForm, { itemCardapioFormData, itemCardapioFormSchema } from "../../../../components/organisms/ItemCardapioForm/ItemCardapioForm";
import IItemCardapio from "../../../../utils/interfaces/itemCardapio";

export function EditarItemCardapio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemCardapio, setItemCardapio] = useState<IItemCardapio>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const item = await ItemCardapioService.get(id);

        setItemCardapio(item);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({ nome, valor, descricao }: itemCardapioFormData, itemData: SearchListRow[]) {
    try {
      const response = await ItemCardapioService.update({
        id: itemCardapio!.id,
        nome,
        valor,
        descricao,
        compostoPor: itemData.map((item) => {
          return {
            item: {
              id: item.key,
              nome: item.name,
              valor: item.price,
              descricao: "",
              categoria: "",
              unidadeMedida: "",
            },
            quantidade: item.amount ?? 0,
          };
        })
      });

      toast.info("Item salvo com sucesso!");
      navigate(`/cardapio?category=item`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Editar Item do Cardápio</Title>

    <ItemCardapioForm onSubmit={handleSave} data={itemCardapio} />
  </div>
}
