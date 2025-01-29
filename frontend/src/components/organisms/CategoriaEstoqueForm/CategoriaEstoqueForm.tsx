import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Label } from "../../atoms/Label/Label";
import { FormField } from "../../molecules/FormField/FormField";
import ISecaoCardapio from "../../../utils/interfaces/secaoCardapio";

export const categoriaEstoqueFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string(),
});

export type categoriaEstoqueFormData = z.infer<typeof categoriaEstoqueFormSchema>;

type SecaoCardapioFormProps = {
  data?: ISecaoCardapio;

  onSubmit: (data: categoriaEstoqueFormData) => void;
};

export default function CategoriaiEstoqueForm({
  data,
  onSubmit
}: SecaoCardapioFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<categoriaEstoqueFormData>({
    resolver: zodResolver(categoriaEstoqueFormSchema),
  });

  const nomeValue = watch("nome");
  const descricaoValue = watch("descricao");

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
          className="col-span-3"
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
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          haveError={!!errors.descricao}
          errorMessage={errors.descricao?.message}
          className="col-span-3"
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
      </div>

      <div className="flex justify-end items-center w-full mt-2 gap-2 col-span-12">
        <Button
          color="white"
          disabled={isSubmitting}
          className="px-4"
          outline
          onClick={(ev) => {
            ev.preventDefault();
            navigate("/estoque?category=categoria")
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{
            data ? "Salvar" : "Nova Categoria"
          }</Label>
        </Button>
      </div>
    </form>
  );
}