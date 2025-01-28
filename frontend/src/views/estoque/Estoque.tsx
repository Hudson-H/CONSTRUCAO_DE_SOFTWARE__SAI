import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";
import { useSearchParams } from "react-router-dom";
import { DataTableBar } from "../../components/molecules/DataTableBar/DataTableBar";
import { textColors } from "../../utils/style/TextColor";
import { text } from "stream/consumers";

const categories = Object.freeze({
  item: "Item",
  categoria: "Categoria",
  lancamento: "Lançamento",
} as const);

const itemDescriptor: DataTableDescriptor[] = [
  { title: "ID"         , type: "text" , size: 1 , key: "id" },
  { title: "Categoria"  , type: "text" , size: 3 , key: "categoria" },
  { title: "Nome"       , type: "text" , size: 4 , key: "nome" },
  { title: "Un. Medida" , type: "text" , size: 3 , key: "unidade_medida" },
  {
    type: "action",
    key: "edit",
    icon: <Pencil className={textColors["blue"]} size={24} />,
    action: () => { console.log("Edit") }
  },
  {
    key: "delete",
    type: "action",
    icon: <Trash className={textColors["red"]} size={24} />,
    action: () => { console.log("Edit") }
  }
];
const itemData = [
  {
    id: 0,
    categoria: "Categoria 1",
    nome: "Item 1",
    unidade_medida: "Un"
  },
  {
    id: 1,
    categoria: "Categoria 2",
    nome: "Item 2",
    unidade_medida: "Un"
  },
  {
    id: 2,
    categoria: "Categoria 3",
    nome: "Item 3",
    unidade_medida: "Un"
  }
];

const categoriaDescriptor: DataTableDescriptor[] = [
  { title: "ID"         , type: "text" , size: 1 , key: "id" },
  { title: "Nome"       , type: "text" , size: 10 , key: "nome" },
  {
    type: "action",
    key: "edit",
    icon: <Pencil className={textColors["blue"]} size={24} />,
    action: () => { console.log("Edit") }
  },
  {
        key: "delete",
    type: "action",
    icon: <Trash className={textColors["red"]} size={24} />,
    action: () => { console.log("Edit") }
  }
];
const categoryData = [
  {
    id: 0,
    nome: "Categoria 1",
    descricao: "Descrição da categoria 1"
  },
  {
    id: 1,
    nome: "Categoria 2",
    descricao: "Descrição da categoria 2"
  },
  {
    id: 2,
    nome: "Categoria 3",
    descricao: "Descrição da categoria 3"
  }
];

const lancamentoDescriptor: DataTableDescriptor[] = [
  { title: "ID"            , type: "text" , size: 1 , key: "id" },
  { title: "Nome"          , type: "text" , size: 3 , key: "nome" },
  { title: "Data Compra"   , type: "text" , size: 3 , key: "data_compra" },
  { title: "Data Validade" , type: "text" , size: 4 , key: "data_validade" },
  {
    type: "action",
    key: "edit",
    icon: <Pencil className={textColors["blue"]} size={24} />,
    action: () => { console.log("Edit") }
  },
  {
        key: "delete",
    type: "action",
    icon: <Trash className={textColors["red"]} size={24} />,
    action: () => { console.log("Edit") }
  }
];
const lancamentoData = [
  {
    id: 0,
    nome: "Lançamento 1",
    data_compra: "01/01/2021",
    data_validade: "01/01/2022"
  },
  {
    id: 1,
    nome: "Lançamento 2",
    data_compra: "01/01/2021",
    data_validade: "01/01/2022"
  },
  {
    id: 2,
    nome: "Lançamento 3",
    data_compra: "01/01/2021",
    data_validade: "01/01/2022"
  }
];

export function Estoque() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<keyof typeof categories>(
    searchParams.get("category") as keyof typeof categories || "item"
  );

  const changeCategory = (category: keyof typeof categories) => {
    setSearchParams({["category"]: category});

    setCategory(category);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Title>Estoque</Title>

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

      <DataTableBar title={categories[category]}></DataTableBar>
      <DataTable
        descriptor={
          category === "item" ? itemDescriptor :
          category === "categoria" ? categoriaDescriptor :
          lancamentoDescriptor
        }
        data={
          category === "item" ? itemData :
          category === "categoria" ? categoryData :
          lancamentoData
        }
      ></DataTable>
    </div>
  );
}
