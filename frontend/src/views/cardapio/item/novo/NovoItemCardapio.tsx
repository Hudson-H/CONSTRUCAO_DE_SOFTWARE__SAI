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
import { useNavigate } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { useState } from "react";
import SearchList, {
  SearchListRow,
} from "../../../../components/organisms/SearchList/SearchList";
import debounce from "../../../../utils/debounce";
import ItemEstoqueService from "../../../../services/ItemEstoqueService";
import ItemCardapioForm, { itemCardapioFormData, itemCardapioFormSchema } from "../../../../components/organisms/ItemCardapioForm/ItemCardapioForm";

export function NovoItemCardapio() {
  const navigate = useNavigate();

  async function handleNew({ nome, valor, descricao }: itemCardapioFormData, itemData: SearchListRow[]) {
    try {
      const response = await ItemCardapioService.add({
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
        }),
      });

      toast.info("Item adicionado com sucesso!");
      navigate(`/cardapio?category=item`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return <div>
    <Title>Novo Item do Cardápio</Title>

    <ItemCardapioForm onSubmit={handleNew} />
  </div>
}
