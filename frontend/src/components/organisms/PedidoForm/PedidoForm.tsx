import { z } from "zod";
import IPedido from "../../../utils/interfaces/pedido";
import SearchList, { SearchListRow } from "../SearchList/SearchList";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormField } from "../../molecules/FormField/FormField";
import { Label } from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import ItemEstoqueService from "../../../services/ItemEstoqueService";
import debounce from "../../../utils/debounce";
import ItemCardapioService from "../../../services/ItemCardapioService";

export const pedidoFormSchema = z.object({
  informacoes: z.string(),
  valor: z.number(),
});

export type pedidoFormData = z.infer<typeof pedidoFormSchema>;

type PedidoFormProps = {
  data?: IPedido;

  onSubmit: (data: pedidoFormData, itemData: SearchListRow[]) => void;
};

export default function PedidoForm({ data, onSubmit }: PedidoFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<pedidoFormData>({
    resolver: zodResolver(pedidoFormSchema),
  });

  const [itemSearch, setItemSearch] = useState("");
  const [itemData, setItemData] = useState<SearchListRow[]>([]);
  const [searchData, setSearchData] = useState<{
    name: string; key: string, price: number
  }[]>(
    []
  );

  const informacoesValue = watch("informacoes");
  const valorValue = watch("valor");

  useEffect(() => {
    const totalPrice = itemData.reduce((prev, cur) => prev += (cur?.price)??0, 0);
    setValue("valor", totalPrice);
  }, [itemData]);

  useEffect(() => {
    reset(data);
  }, [data]);

  useEffect(() => {
    if (data?.items) {
      setItemData(
        data.items.map((item) => {
          return {
            key: item.id,
            name: item.nome,
            price: item.preco,
            additionals: [],
          };
        })
      );
    }

    // reset(data);
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
      <FormField
        haveError={!!errors.valor}
        errorMessage={errors.valor?.message}
        className="col-span-12"
      >
        <Label>Pedido:</Label>
        <SearchList
          enableAdditionals
          enablePrice
          doNotStackItens
          items={itemData}
          searchData={searchData}
          searchValue={itemSearch}
          onSearchChange={(search) => {
            setItemSearch(search);

            debounce(async () => {
              const response = await ItemCardapioService.search(search);

              setSearchData(
                response.map((item) => {
                  return {
                    name: item.nome,
                    key: item.id,
                    price: item.valor
                  };
                })
              );
            }, 100)();
          }}
          onChange={(list) => {
            setItemData(list);
          }}
        ></SearchList>
        <div className="w-full pt-2 flex justify-end">
          <Label className="text-2xl">Total: {valorValue?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</Label>
        </div>
      </FormField>

      <Label className="col-span-4">Informações Adicionais:</Label>
      <FormField
        haveError={!!errors.valor}
        errorMessage={errors.valor?.message}
        className="
          col-span-12
          px-2 py-2 content-between items-center self-stretch
          border-2 border-silver-chalice-400 border-opacity-25 rounded
        "
      >
        <textarea
          placeholder="Escreva aqui as informações adicionais..."
          className="
            w-full h-full
            leading-normal tracking-wider font-roboto text-justify
            outline-none select-none overflow-y-visible
            font-light
          "
          value={informacoesValue}
          onChange={(ev) => setValue("informacoes", ev.target.value)}
        >

        </textarea>
      </FormField>

      <div className="flex justify-end items-center w-full mt-2 gap-2 col-span-12">
        <Button
          color="white"
          disabled={isSubmitting}
          className="px-4"
          outline
          onClick={(ev) => {
            ev.preventDefault();
            navigate("/cardapio?category=item");
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{data ? "Salvar" : "Novo Pedido"}</Label>
        </Button>
      </div>
    </form>
  );
}
