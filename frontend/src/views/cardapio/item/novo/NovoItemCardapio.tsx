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

type NovoItemCardapioProps = {};

const categoryFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  valor: z.number().min(0, "Valor deve ser maior que 0"),
  descricao: z.string(),
});

export type categoryFormData = z.infer<typeof categoryFormSchema>;

export function NovoItemCardapio() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<categoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  const nomeValue = watch("nome");
  const valorValue = watch("valor");
  const descricaoValue = watch("descricao");

  async function handleNew({
    nome,
    valor,
    descricao,
  }: categoryFormData) {
    try {
      const response = await ItemCardapioService.add({
        nome,
        valor,
        descricao,
        compostoPor: [],
      });

      toast.info("Item adicionado com sucesso!");
      navigate(`/cardapio?category=item`);
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message);
    }
  }

  return (
    <div>
      <Title>Novo Item do Cardápio</Title>

      <form
        onSubmit={handleSubmit(handleNew)}
        className="
          relative w-full h-full flex flex-col justify-center gap-4
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
              value={""}
              onChange={(ev) => {
                let value = ev.target.value.replaceAll(".", "").replace(",", ".");
                setValue("valor", +value)
              }}
              placeholder="Insira o valor"
              className="font-light"
              borderless
            ></Input>
          </FormField>
        </div>

        <div className="grid grid-cols-12 gap-4">
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

        <div className="flex justify-end items-center w-full mt-2 gap-2">
          <Button
            color="white"
            disabled={isSubmitting}
            className="px-4"
            outline
          >
            <Label light className="w-full">
              Cancelar
            </Label>
          </Button>
          <Button color="blue" disabled={isSubmitting} className="px-4">
            <Label className="w-full">Novo Item</Label>
          </Button>
        </div>
      </form>
    </div>
  );
}
