import { useNavigate } from "react-router-dom";
import FuncionarioForm, { funcionarioFormData } from "../../../components/organisms/FuncionarioForm/FuncionarioForm";
import FuncionarioService from "../../../services/FuncionarioService";
import { toast } from "react-toastify";
import { Title } from "../../../components/atoms/Title/Title";

export function NovoFuncionario() {
  const navigate = useNavigate();

  async function handleNew({
    nome,
    sexo,
    salario,
    dataInicio,
    endereco,
  }: funcionarioFormData) {
    try {
      const response = await FuncionarioService.add({
        nome,
        sexo,
        salario,
        dataInicio: new Date(dataInicio),
        endereco,
      });

      toast.info("Funcionário adicionado com sucesso!");
      navigate(`/funcionario`);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    <div>
      <Title>Novo Funcionario</Title>

      <FuncionarioForm onSubmit={handleNew} />
    </div>
  );
}
