import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { useEffect, useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";
import { useSearchParams } from "react-router-dom";
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

const categories = Object.freeze({
  item: "Item",
  categoria: "Categoria",
  lancamento: "Lançamento",
} as const);

const itemDescriptor: DataTableDescriptor[] = [
  { title: "ID"         , type: "text" , size: 1 , key: "id" },
  { title: "Categoria"  , type: "text" , size: 3 , key: "categoria" },
  { title: "Nome"       , type: "text" , size: 4 , key: "nome" },
  { title: "Un. Medida" , type: "text" , size: 3 , key: "unidadeMedida" },
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

const lancamentoDescriptor: DataTableDescriptor[] = [
  { title: "ID"            , type: "text" , size: 1 , key: "id" },
  { title: "Nome"          , type: "text" , size: 3 , key: "nome" },
  { title: "Data Compra"   , type: "date" , size: 3 , key: "dataCompra" },
  { title: "Data Validade" , type: "date" , size: 4 , key: "dataValidade" },
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

export function Estoque() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<keyof typeof categories>(
    searchParams.get("category") as keyof typeof categories || "item"
  );

  const [itemData, setItemData] = useState<IItemEstoque[]>([]);
  const [categoryData, setCategoryData] = useState<ICategoriaEstoque[]>([]);
  const [lancamentoData, setLancamentoData] = useState<ILancamentoEstoque[]>([]);

  useEffect(() => {
    ItemEstoqueService.list().then((data) => {
      setItemData(data);
    }).catch(reason => {
      toast.error(reason);
    });

    CategoriaEstoqueService.list().then((data) => {
      setCategoryData(data);
    }).catch(reason => {
      toast.error(reason);
    });

    LancamentoEstoqueService.list().then((data) => {
      setLancamentoData(data);
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
