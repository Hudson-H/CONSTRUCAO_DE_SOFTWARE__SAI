import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ItemEstoqueService from "../../../services/ItemEstoqueService";
import debounce from "../../../utils/debounce";
import { Title } from "../../atoms/Title/Title";
import { FormField } from "../../molecules/FormField/FormField";
import SearchList, { SearchListRow } from "../SearchList/SearchList";
import Input from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import IItemCardapio from "../../../utils/interfaces/itemCardapio";

export const itemCardapioFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  valor: z.number().min(0, "Valor deve ser maior que 0"),
  descricao: z.string(),
});

export type itemCardapioFormData = z.infer<typeof itemCardapioFormSchema>;

type ItemCardapioFormProps = {
  data?: IItemCardapio;

  onSubmit: (data: itemCardapioFormData, itemData: SearchListRow[]) => void;
};

export default function ItemCardapioForm({
  data,
  onSubmit,
}: ItemCardapioFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<itemCardapioFormData>({
    resolver: zodResolver(itemCardapioFormSchema),
  });

  const nomeValue = watch("nome");
  const descricaoValue = watch("descricao");
  const valorValue = watch("valor");
  // const compostoPor = watch("compostoPor");

  const [itemSearch, setItemSearch] = useState("");
  const [itemData, setItemData] = useState<SearchListRow[]>([]);
  const [searchData, setSearchData] = useState<{ name: string; key: string }[]>(
    []
  );

  useEffect(() => {
    if (data?.compostoPor) {
      setItemData(data.compostoPor.map((item) => {
        return {
          key: item.item.id,
          name: item.item.nome,
          amount: item.quantidade,
        }
      }));
    }

    reset(data);
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data, itemData);
      })}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") ev.preventDefault();
      }}
      className="
          relative w-full h-full grid grid-cols-12 justify-center gap-x-8 gap-y-4
          py-4
        "
    >
      <div id="left" className="col-span-6 row-span-1">
        <div className="grid grid-cols-6 gap-4">
          <FormField
            haveError={!!errors.nome}
            errorMessage={errors.nome?.message}
            className="col-span-4"
          >
            <Label>Nome</Label>
            <Input
              type="text"
              value={nomeValue ?? ""}
              onChange={(ev) => setValue("nome", ev.target.value)}
              placeholder="Insira o nome"
              className="font-light"
              borderless
            ></Input>
          </FormField>
          <FormField
            haveError={!!errors.valor}
            errorMessage={errors.valor?.message}
            className="col-span-2"
          >
            <Label>Valor</Label>
            <Input
              type="currency"
              value={valorValue}
              onChange={(ev) => {
                let value = ev.target.value;
                if (value === undefined) {
                  // FIXME: This is a bug
                  setValue("valor", 0);
                  return;
                }
                value = value
                  .replaceAll(".", "")
                  .replace(",", ".");
                setValue("valor", isNaN(+value) ? 0: +value);
              }}
              placeholder="Insira o valor"
              className="font-light"
              borderless
            ></Input>
          </FormField>

          <FormField
            haveError={!!errors.descricao}
            errorMessage={errors.descricao?.message}
            className="col-span-6"
          >
            <Label>Descrição</Label>
            <Input
              type="text"
              value={descricaoValue ?? ""}
              onChange={(ev) => setValue("descricao", ev.target.value)}
              placeholder="Escreva a descricao"
              className="font-light"
              borderless
            ></Input>
          </FormField>
        </div>
      </div>

      <div id="right" className="col-span-6 row-span-1">
        <Label>Composto por:</Label>
        <SearchList
          enableAmount
          items={itemData}
          searchData={searchData}
          searchValue={itemSearch}
          onSearchChange={(search) => {
            setItemSearch(search);

            debounce(async () => {
              const response = await ItemEstoqueService.search(search);

              setSearchData(
                response.map((item) => {
                  return {
                    name: item.nome,
                    key: item.id,
                  };
                })
              );
            }, 100)();
          }}
          onChange={(list) => {
            setItemData(list);
          }}
        ></SearchList>
      </div>

      <div className="flex justify-end items-center w-full mt-2 gap-2 col-span-12">
        <Button
          color="white"
          disabled={isSubmitting}
          className="px-4"
          outline
          onClick={(ev) => {
            ev.preventDefault();
            navigate("/cardapio?category=item")
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{
            data ? "Salvar" : "Novo Item"
          }</Label>
        </Button>
      </div>
    </form>
  );
}
