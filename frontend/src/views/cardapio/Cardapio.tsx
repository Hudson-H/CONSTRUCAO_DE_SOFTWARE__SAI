import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Label } from "../../components/atoms/Label/Label";
import { Title } from "../../components/atoms/Title/Title";
import { useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";
import { useSearchParams } from "react-router-dom";
import { DataTableBar } from "../../components/molecules/DataTableBar/DataTableBar";
import { textColors } from "../../utils/style/TextColor";

const categories = Object.freeze({
  item: "Item",
  secao: "Seção",
  adicional: "Adicional"
} as const);

const itemDescriptor: DataTableDescriptor[] = [
  { title: "ID"         , type: "text" , size: 1 , key: "id" },
  { title: "Nome"       , type: "text" , size: 3 , key: "nome" },
  { title: "Descrição"  , type: "text" , size: 4 , key: "descricao" },
  { title: "Estratégia" , type: "text" , size: 3 , key: "estrategia_controle" },
  {
    type: "action",
    key: "edit",
    size: 1,
    icon: <Pencil className={textColors["blue"]} size={24} />,
    action: () => { console.log("Edit") }
  },
  {
    key: "delete",
    type: "action",
    size: 1,
    icon: <Trash className={textColors["red"]} size={24} />,
    action: () => { console.log("Edit") }
  }
];
const itemData = [
  {
    id: 0,
    nome: "Item 1",
    descricao: "Descrição do item 1",
    estrategia_controle: "Controle 1"
  },
  {
    id: 0,
    nome: "Item 2",
    descricao: "Descrição do item 2",
    estrategia_controle: "Controle 2"
  },
  {
    id: 0,
    nome: "Item 3",
    descricao: "Descrição do item 3",
    estrategia_controle: "Controle 3"
  }
];

const sectionDescriptor: DataTableDescriptor[] = [
  { title: "ID"        , type: "text" , size: 1 , key: "id" },
  { title: "Nome"      , type: "text" , size: 10 , key: "nome" },
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
    action: () => { console.log("Remove") }
  }
];
const sectionData = [
  {
    id: 0,
    nome: "Seção 1",
    descricao: "Descrição da seção 1"
  },
  {
    id: 0,
    nome: "Seção 2",
    descricao: "Descrição da seção 2"
  },
  {
    id: 0,
    nome: "Seção 3",
    descricao: "Descrição da seção 3"
  }
];

const additionalDescriptor: DataTableDescriptor[] = [
  { title: "ID"        , type: "text" , size: 1 , key: "id" },
  { title: "Nome"      , type: "text" , size: 3 , key: "nome" },
  { title: "Descrição" , type: "text" , size: 7 , key: "descricao" },
  {
    type: "action",
    key: "edit",
    size: 1,
    icon: <Pencil className={textColors["blue"]} size={24} />,
    action: () => { console.log("Edit") }
  },
  {
    key: "delete",
    type: "action",
    size: 1,
    icon: <Trash className={textColors["red"]} size={24} />,
    action: () => { console.log("Edit") }
  }
];
const additionalData = [
  {
    id: 0,
    nome: "Adicional 1",
    descricao: "Descrição do adicional 1"
  },
  {
    id: 0,
    nome: "Adicional 2",
    descricao: "Descrição do adicional 2"
  },
  {
    id: 0,
    nome: "Adicional 3",
    descricao: "Descrição do adicional 3"
  }
];

export function Cardapio() {
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
      <Title>Cardápio</Title>

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
          category === "secao" ? sectionDescriptor :
          additionalDescriptor
        }
        data={
          category === "item" ? itemData :
          category === "secao" ? sectionData :
          additionalData
        }
      ></DataTable>
    </div>
  );
}
