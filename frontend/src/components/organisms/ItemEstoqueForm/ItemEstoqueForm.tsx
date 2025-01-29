import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Label } from "../../atoms/Label/Label";
import { FormField } from "../../molecules/FormField/FormField";
import ItemSearch from "../../molecules/ItemSearch/ItemSearch";
import IItemEstoque from "../../../utils/interfaces/itemEstoque";
import CategorySearch from "../../molecules/CategorySearch/CategorySearch";
import TipoUnidadeSearch from "../../molecules/TipoUnidadeSearch/TipoUnidadeSearch";
import CustomCombobox from "../../molecules/CustomCombobox/CustomCombobox";
import ESTRATEGIA_CONTROLE from "../../../utils/enum/estrategiaControle";

export const itemEstoqueFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  categoria: z.string().min(1, "Categoria é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatório"),
  estrategiaControle: z.string().min(1, "Estratégia de Controle é obrigatório"),
  tipoUnidade: z.object({
    id: z.string(),
    nome: z.string(),
  }),
});

export type itemEstoqueFormData = z.infer<typeof itemEstoqueFormSchema>;

type ItemEstoqueFormsProps = {
  data?: IItemEstoque;

  onSubmit: (data: itemEstoqueFormData) => void;
};

export default function ItemEstoqueForm({
  data,
  onSubmit,
}: ItemEstoqueFormsProps) {
  const navigate = useNavigate();
  const [estrategiaControleFilter, setEstrategiaControleFilter] = useState("");

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<itemEstoqueFormData>({
    resolver: zodResolver(itemEstoqueFormSchema),
  });

  const nomeValue = watch("nome");
  const categoriaValue = watch("categoria");
  const descricaoValue = watch("descricao");
  const estrategiaControleValue = watch("estrategiaControle");
  const tipoUnidadeValue = watch("tipoUnidade");

  useEffect(() => {
    reset(data);
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
          haveError={!!errors.categoria}
          errorMessage={errors.categoria?.message}
          className="col-span-2"
        >
          <Label>Categoria</Label>
          <CategorySearch
            value={
              categoriaValue
                ? {
                    key: "0",
                    name: categoriaValue,
                  }
                : undefined
            }
            onChange={(value) => {
              setValue("categoria", value.name);
            }}
          ></CategorySearch>
        </FormField>

        <FormField
          haveError={!!errors.tipoUnidade}
          errorMessage={errors.tipoUnidade?.message}
          className="col-span-2"
        >
          <Label>Tipo Unidade</Label>
          <TipoUnidadeSearch
            value={
              tipoUnidadeValue
                ? {
                    key: tipoUnidadeValue.id,
                    name: tipoUnidadeValue.nome,
                  }
                : undefined
            }
            onChange={(value) => {
              setValue("tipoUnidade.id", value?.key);
              setValue("tipoUnidade.nome", value?.name);
            }}
          ></TipoUnidadeSearch>
        </FormField>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          haveError={!!errors.descricao}
          errorMessage={errors.descricao?.message}
          className="col-span-4"
        >
          <Label>Descrição</Label>
          <Input
            type="text"
            value={descricaoValue ?? ""}
            onChange={(ev) => setValue("descricao", ev.target.value)}
            placeholder="Insira a descrição"
            className="font-light"
            borderless
          ></Input>
        </FormField>

        <FormField
          haveError={!!errors.estrategiaControle}
          errorMessage={errors.estrategiaControle?.message}
          className="col-span-2"
        >
          <Label>Estrategia de Controle</Label>
          <CustomCombobox
            data={ESTRATEGIA_CONTROLE.map((value, index) => {
              return {
                key: index.toString(),
                name: value,
              };
            }).filter((value) =>
              value.name
                .toLowerCase()
                .includes(estrategiaControleFilter.toLowerCase())
            )}
            value={
              estrategiaControleValue
                ? {
                    key: ESTRATEGIA_CONTROLE.findIndex(
                      (value) => value === estrategiaControleValue
                    ).toString(),
                    name: estrategiaControleValue,
                  }
                : undefined
            }
            onChange={(value) => {
              setValue("estrategiaControle", value?.name);
            }}
            onWrite={setEstrategiaControleFilter}
          ></CustomCombobox>
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
            navigate("/estoque?category=item");
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{data ? "Salvar" : "Novo Item"}</Label>
        </Button>
      </div>
    </form>
  );
}
