import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Label } from "../../atoms/Label/Label";
import { FormField } from "../../molecules/FormField/FormField";
import IFuncionario from "../../../services/Funcionario";

export const funcionarioFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sexo: z.string().min(1, "Sexo é obrigatório"),
  salario: z.number(),
  dataInicio: z.string(),
  endereco: z.string().min(1, "Endereço é obrigatório"),
});

export type funcionarioFormData = z.infer<typeof funcionarioFormSchema>;

type FuncionarioFormProps = {
  data?: IFuncionario;

  onSubmit: (data: funcionarioFormData) => void;
};

export default function FuncionarioForm({
  data,
  onSubmit,
}: FuncionarioFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<funcionarioFormData>({
    resolver: zodResolver(funcionarioFormSchema),
  });

  const nomeValue = watch("nome");
  const sexoValue = watch("sexo");
  const salarioValue = watch("salario");
  const dataInicioValue = watch("dataInicio");
  const enderecoValue = watch("endereco");

  useEffect(() => {
    reset({
      ...data,
      dataInicio: data?.dataInicio?.toISOString().split("T")[0],
    });
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
          <Label>Nome:</Label>
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
          haveError={!!errors.sexo}
          errorMessage={errors.sexo?.message}
          className="col-span-2"
        >
          <Label>Sexo:</Label>
          <Input
            type="text"
            value={sexoValue ?? ""}
            onChange={(ev) => setValue("sexo", ev.target.value)}
            placeholder="Insira o sexo"
            className="font-light"
            borderless
          ></Input>
        </FormField>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          haveError={!!errors.salario}
          errorMessage={errors.salario?.message}
          className="col-span-4"
        >
          <Label>Salário:</Label>
          <Input
            type="number"
            value={salarioValue ?? ""}
            onChange={(ev) => setValue("salario", +ev.target.value)}
            placeholder="Insira o salário"
            className="font-light"
            borderless
          ></Input>
        </FormField>
        <FormField
          haveError={!!errors.dataInicio}
          errorMessage={errors.dataInicio?.message}
          className="col-span-2"
        >
          <Label>Data Inicio:</Label>
          <Input
            type="date"
            value={dataInicioValue ?? ""}
            onChange={(ev) => setValue("dataInicio", ev.target.value)}
            placeholder="Insira a data de inicio"
            className="font-light"
            borderless
          ></Input>
        </FormField>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          haveError={!!errors.dataInicio}
          errorMessage={errors.dataInicio?.message}
          className="col-span-6"
        >
          <Label>Endereco:</Label>
          <Input
            type="text"
            value={enderecoValue ?? ""}
            onChange={(ev) => setValue("endereco", ev.target.value)}
            placeholder="Insira o endereco"
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
            navigate("/cardapio?category=secao");
          }}
        >
          <Label light className="w-full">
            Cancelar
          </Label>
        </Button>
        <Button color="blue" disabled={isSubmitting} className="px-4">
          <Label className="w-full">{data ? "Salvar" : "Nova Funcionario"}</Label>
        </Button>
      </div>
    </form>
  );
}
