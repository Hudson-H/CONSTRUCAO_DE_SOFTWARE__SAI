import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../components/atoms/Title/Title";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import IItemEstoque from "../../../utils/interfaces/itemEstoque";
import FuncionarioService from "../../../services/FuncionarioService";
import IFuncionario from "../../../services/Funcionario";
import FuncionarioForm, { funcionarioFormData } from "../../../components/organisms/FuncionarioForm/FuncionarioForm";

export function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState<IFuncionario>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID não informado");

        const funcionario = await FuncionarioService.get(id);

        setFuncionario(funcionario);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    }

    fetchData();
  }, [id]);

  async function handleSave({
    nome,
    sexo,
    salario,
    dataInicio,
    endereco,
  }: funcionarioFormData) {
    try {
      const response = await FuncionarioService.update({
        id: funcionario!.id,
        nome,
        sexo,
        salario,
        dataInicio: new Date(dataInicio),
        endereco,
      });

      toast.info("Item salvo com sucesso!");
      navigate(`/funcionario`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    <div>
      <Title>Editar Funcionario</Title>

      <FuncionarioForm onSubmit={handleSave} data={funcionario} />
    </div>
  );
}
