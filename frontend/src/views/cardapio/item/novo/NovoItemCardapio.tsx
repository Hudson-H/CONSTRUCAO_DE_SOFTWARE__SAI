import { Title } from "../../../../components/atoms/Title/Title";
import ItemCardapioService from "../../../../services/ItemCardapioService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  SearchListRow,
} from "../../../../components/organisms/SearchList/SearchList";
import ItemCardapioForm, { itemCardapioFormData } from "../../../../components/organisms/ItemCardapioForm/ItemCardapioForm";

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
