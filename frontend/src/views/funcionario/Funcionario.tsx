import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { useEffect, useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataTableBar } from "../../components/molecules/DataTableBar/DataTableBar";
import { textColors } from "../../utils/style/TextColor";
import { text } from "stream/consumers";
import IItemEstoque from "../../utils/interfaces/itemEstoque";
import ICategoriaEstoque from "../../utils/interfaces/categoriaEstoque";
import ItemEstoqueService from "../../services/ItemEstoqueService";
import CategoriaEstoqueService from "../../services/CategoriaEstoqueService";
import { toast } from "react-toastify";
import LancamentoEstoqueService from "../../services/LancamentoEstoqueService";
import ILancamentoEstoque from "../../utils/interfaces/lancamentoEstoque";
import TipoUnidadeService from "../../services/TipoUnidadeService";
import ITipoUnidade from "../../utils/interfaces/tipoUnidade";
import FuncionarioService from "../../services/FuncionarioService";
import IFuncionario from "../../services/Funcionario";

const categories = Object.freeze({
  todos: "Todos",
} as const);

export function Funcionario() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<keyof typeof categories>(
    searchParams.get("category") as keyof typeof categories || "todos"
  );

  const [funcionarioData, setFuncionarioData] = useState<IFuncionario[]>([]);

  const funcionarioDescriptor: DataTableDescriptor[] = [
    { title: "ID"          , type: "text" , size: 1 , key: "id" },
    { title: "Nome"        , type: "text" , size: 3 , key: "categoria" },
    { title: "Data Inicio" , type: "date" , size: 7 , key: "dataInicio" },
    {
      type: "action",
      key: "edit",
      icon: <Pencil className={textColors["blue"]} size={24} />,
      action: async (data: IItemEstoque) => {
        navigate(`/funcionario/${data.id}`);
      }
    },
    {
      key: "delete",
      type: "action",
      icon: <Trash className={textColors["red"]} size={24} />,
      action: async (data: IItemEstoque) => {
        try {
          await FuncionarioService.delete(data.id);

          const newData = await FuncionarioService.list();
          setFuncionarioData(newData);
        } catch (err) {
          if (err instanceof Error)
            toast.error(err.message);
        }
      }
    }
  ];

  useEffect(() => {
    FuncionarioService.list().then((data) => {
      setFuncionarioData(data);
    }).catch(reason => {
      toast.error(reason);
    });
  }, []);

  const changeCategory = (category: keyof typeof categories) => {
    setSearchParams({["category"]: category});

    setCategory(category);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Title>Funcionário</Title>

      <div className="flex flex-row gap-4">
        {Object.entries(categories).map(([key, value]) =>
          <Button
            key={key}
            className="px-4 py-2"
            outline={category !== key}
            color={category === key ? "gray" : "white"}
            onClick={() => {
              changeCategory(key as keyof typeof categories);
            }}
          >
            {value}
          </Button>
        )}
      </div>

      <DataTableBar title={categories[category]} newButtonLink={
        "/funcionario/novo"
      }></DataTableBar>
      <DataTable
        descriptor={
          funcionarioDescriptor
        }
        data={
          funcionarioData
        }
      ></DataTable>
    </div>
  );
}
