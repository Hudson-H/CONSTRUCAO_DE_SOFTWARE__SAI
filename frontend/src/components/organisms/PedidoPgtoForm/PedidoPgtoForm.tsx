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

const categories = Object.freeze({
  credito: "Crédito",
  debito: "Débito",
  pix: "Pix",
  dinheiro: "Dinheiro",
} as const);

export const pedidoPgtoFormSchema = z.object({
  formaPagamento: z.string(),
  valorRecebido: z.number(),
  troco: z.number(),
});

export type pedidoPgtoFormData = z.infer<typeof pedidoPgtoFormSchema>;

type PedidoPgtoFormProps = {
  data?: IPedido;

  onSubmit: (data: pedidoPgtoFormData) => void;
};

export default function PedidoPgtoForm({
  data,
  onSubmit,
}: PedidoPgtoFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<pedidoPgtoFormData>({
    resolver: zodResolver(pedidoPgtoFormSchema),
  });

  const [itemData, setItemData] = useState<SearchListRow[]>([]);

  // const informacoesValue = watch("informacoes");
  const valorRecebidoValue = watch("valorRecebido");
  const formaPagamentoValue = watch("formaPagamento");
  const trocoValue = watch("troco");

  useEffect(() => {
    const totalPrice = itemData.reduce(
      (prev, cur) => (prev += cur?.price ?? 0),
      0
    );
    const totalExchange = valorRecebidoValue - totalPrice;
    console.log(totalExchange);
    setValue("troco", totalExchange);
  }, [itemData, valorRecebidoValue]);

  useEffect(() => {
    if (data?.items) {
      setItemData(data.items.map((item) => {
        return {
          key: item.id,
          name: item.nome,
          price: item.preco??0,
          additionals: item.adicionais?.map((adicional) => {
            return {
              key: adicional.id,
              name: adicional.nome,
              price: adicional.preco??0,
              quantity: adicional.quantidade??0,
            };
          })??[]
        };
      }));
    }

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
        onSubmit(data);
      })}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") ev.preventDefault();
      }}
      className="
        relative w-full h-full flex flex-col justify-center gap-4
        py-4
      "
    >
      <Label>Pedido:</Label>
      <div className="flex flex-col justify-between w-full min-h-64 px-4 pt-2 py-6 rounded border-2 mt-2">
        <div className="h-full">
          {itemData.length > 0 ? (
            itemData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-row justify-between items-center py-4 gap-4"
                >
                  <Label light className="grow">
                    {item.name}
                  </Label>
                  {item.price !== undefined ? (
                    <Label>R$ {item.price.toFixed(2)}</Label>
                  ) : null}
                  <div className="flex gap-4">
                    Ver Adicionais
                    <div className="w-6 aspect-square py-0.5 bg-black/15 rounded-3xl justify-center items-center inline-flex overflow-hidden">
                      {item.additionals?.length ?? 0}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col justify-center w-full h-full text-center py-4">
              <Label light color="black" className="w-full text-opacity-25">
                Nenhum item adicionado
              </Label>
            </div>
          )}
        </div>
      </div>

      <FormField
        haveError={!!errors.formaPagamento}
        errorMessage={errors.formaPagamento?.message}
        className="col-span-2"
      >
        <Label>Forma Pagamento:</Label>
        <div className="flex flex-row gap-4">
          {Object.entries(categories).map(([key, value]) => (
            <Button
              key={key}
              className="px-4 py-2"
              outline={formaPagamentoValue !== key}
              color={formaPagamentoValue === key ? "gray" : "white"}
              onClick={() => {
                setValue("formaPagamento", key as keyof typeof categories);
              }}
            >
              {value}
            </Button>
          ))}
        </div>
      </FormField>

      <FormField
        haveError={!!errors.valorRecebido}
        errorMessage={errors.valorRecebido?.message}
        className="col-span-2"
      >
        <Label>Valor</Label>
        <Input
          type="currency"
          value={valorRecebidoValue}
          onChange={(ev) => {
            let value = ev.target.value;
            if (value === undefined) {
              // FIXME: This is a bug
              setValue("valorRecebido", 0);
              return;
            }
            value = value.replaceAll(".", "").replace(",", ".");
            setValue("valorRecebido", isNaN(+value) ? 0 : +value);
          }}
          placeholder="Insira o valor recebido"
          className="font-light"
          borderless
        ></Input>
      </FormField>

      <FormField
        haveError={!!errors.troco}
        errorMessage={errors.troco?.message}
        className="col-span-12"
      >
        <div className="w-full pt-2 flex justify-start">
          <Label className="text-2xl">
            Troco: {" "}
            {trocoValue?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Label>
        </div>
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
