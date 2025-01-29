import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Label } from "../../atoms/Label/Label";
import { FormField } from "../../molecules/FormField/FormField";
import ITipoUnidade from "../../../utils/interfaces/tipoUnidade";

export const tipoUnidadeFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sigla: z.string(),
});

export type tipoUnidadeFormData = z.infer<typeof tipoUnidadeFormSchema>;

type TipoUnidadeFormSchema = {
  data?: ITipoUnidade;

  onSubmit: (data: tipoUnidadeFormData) => void;
};

export default function TipoUnidadeForm({
  data,
  onSubmit
}: TipoUnidadeFormSchema) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<tipoUnidadeFormData>({
    resolver: zodResolver(tipoUnidadeFormSchema),
  });

  const nomeValue = watch("nome");
  const siglaValue = watch("sigla");

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
          haveError={!!errors.sigla}
          errorMessage={errors.sigla?.message}
          className="col-span-3"
        >
          <Label>Sigla</Label>
          <Input
            type="text"
            value={siglaValue ?? ""}
            onChange={(ev) => setValue("sigla", ev.target.value)}
            placeholder="Insira a sigla"
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
            navigate("/estoque?category=tipoUnidade")
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{
            data ? "Salvar" : "Novo Tipo Unidade"
          }</Label>
        </Button>
      </div>
    </form>
  );
}