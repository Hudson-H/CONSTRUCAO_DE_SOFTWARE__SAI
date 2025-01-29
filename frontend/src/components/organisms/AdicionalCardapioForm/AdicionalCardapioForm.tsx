import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Label } from "../../atoms/Label/Label";
import { FormField } from "../../molecules/FormField/FormField";
import IAdionalCardapio from "../../../utils/interfaces/secaoCardapio";
import ItemSearch from "../../molecules/ItemSearch/ItemSearch";

export const adicionalCardapioFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  valor: z.number(),
  item: z.object({
    nome: z.string(),
    id: z.string(),
  }),
  quantidade: z.number()
});

export type adicionalCardapioFormData = z.infer<typeof adicionalCardapioFormSchema>;

type AdicionalCardapioFormProps = {
  data?: IAdionalCardapio;

  onSubmit: (data: adicionalCardapioFormData) => void;
};

export default function AdicionalCardapioForm({
  data,
  onSubmit
}: AdicionalCardapioFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<adicionalCardapioFormData>({
    resolver: zodResolver(adicionalCardapioFormSchema),
  });

  const nomeValue = watch("nome");
  const valorValue = watch("valor");
  const itemValue = watch("item");
  const quantidadeValue = watch("quantidade")

  useEffect(() => {
    reset(data);
  }, [data]);

  console.log(itemValue);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") ev.preventDefault();
      }}
      className="
        relative w-full h-full flex flex-col justify-center
        gap-4 py-4
      "
    >
      <div className="grid grid-cols-12 gap-4">
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
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          haveError={!!errors.valor}
          errorMessage={errors.valor?.message}
          className="col-span-4"
        >
          <Label>Item</Label>
          <ItemSearch
            value={itemValue ? {
              key: itemValue.id,
              name: itemValue.nome
            } : undefined}
            onChange={(value) => {
              setValue("item.id", value?.key);
              setValue("item.nome", value?.name);
            }
          }></ItemSearch>
        </FormField>
        <FormField
          haveError={!!errors.valor}
          errorMessage={errors.valor?.message}
          className="col-span-2"
        >
          <Label>Quantidade</Label>
          <Input
            type="number"
            value={quantidadeValue ?? ""}
            onChange={(ev) => setValue("quantidade", +ev.target.value)}
            placeholder="Insira o quantidade"
            className="font-light"
            borderless
          ></Input>
        </FormField>
      </div>

      <div className="flex justify-end items-center w-full mt-2 gap-2 col-span-12">
        <Button
          color="white"
          disabled={isSubmitting}
          className="px-4"
          outline
          onClick={(ev) => {
            ev.preventDefault();
            navigate("/cardapio?category=adicional")
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{
            data ? "Salvar" : "Novo Adicional"
          }</Label>
        </Button>
      </div>
    </form>
  );
}