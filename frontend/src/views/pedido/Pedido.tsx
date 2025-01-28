import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";
import { useSearchParams } from "react-router-dom";
import { DataTableBar } from "../../components/molecules/DataTableBar/DataTableBar";
import { textColors } from "../../utils/style/TextColor";

const categories = Object.freeze({
  todos: "Todos",
  emEspera: "Em Espera",
  preparando: "Preparando",
  pronto: "Pronto",
  cancelado: "Cancelado",
  entregue: "Entregue",
  concluido: "Concluído",
  esperandoPgto: "Esperando Pgto.",
} as const);

const orderDescriptor: DataTableDescriptor[] = [
  { title: "ID"          , type: "text"   , size: 1 , key: "id" },
  { title: "Status"      , type: "text"   , size: 3 , key: "status" },
  { title: "Método Pgto.", type: "text"   , size: 4 , key: "metodoPgto" },
  { title: "Valor"       , type: "text" , size: 3 , key: "valor" },
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

export function Pedido() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<keyof typeof categories>(
    searchParams.get("category") as keyof typeof categories || "todos"
  );

  const [orderData, setOrderData] = useState([]);

  const changeCategory = (category: keyof typeof categories) => {
    setSearchParams({["category"]: category});

    setCategory(category);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Title>Pedido</Title>

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

      <DataTableBar title={categories[category]} newButtonLink="/pedido/novo"></DataTableBar>
      <DataTable
        descriptor={orderDescriptor}
        data={orderData}
      ></DataTable>
    </div>
  );
}
