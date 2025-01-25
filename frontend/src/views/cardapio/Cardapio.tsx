import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Label } from "../../components/atoms/Label/Label";
import { Title } from "../../components/atoms/Title/Title";
import { useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";

const categories = ["Item", "Seção", "Adicional"] as const;

const sectionDescriptor: DataTableDescriptor[] = [
  { title: "Nome", type: "text", size: 5, key: "nome" },
  { title: "Descrição", type: "text", size: 6, key: "descricao" },
  {
    title: "Ações",
    type: "action",
    size: 1,
    icon: <Pencil size={24} />,
    action: () => { console.log("Edit") }
  }
]

export function Cardapio() {
  const [category, setCategory] = useState<"Item" | "Seção" | "Adicional">(
    "Item"
  );

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Title>Cardápio</Title>

      <div className="flex flex-row gap-4">
        {categories.map(value =>
          <Button
            key={value}
            className="px-4 py-2"
            outline={category !== value}
            color={category === value ? "gray" : "white"}
            onClick={() => {
              setCategory(value)
            }}
          >
            {value}
          </Button>
        )}
      </div>

      <div className="flex flex-row items-center justify-between">
        <Title>{category}</Title>
        <Button className="h-fit" color="blue">
          Novo
        </Button>
      </div>

      <DataTable
        descriptor={sectionDescriptor}
        data={
          [
            {
              nome: "Seção 1",
              descricao: "Descrição da seção 1"
            },
            {
              nome: "Seção 2",
              descricao: "Descrição da seção 2"
            },
            {
              nome: "Seção 3",
              descricao: "Descrição da seção 3"
            }
          ]
        }
      ></DataTable>
    </div>
  );
}
