import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { useEffect, useState } from "react";
import { DataTable, DataTableDescriptor } from "../../components/organisms/DataTable/DataTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataTableBar } from "../../components/molecules/DataTableBar/DataTableBar";
import { textColors } from "../../utils/style/TextColor";
import IItemCardapio from "../../utils/interfaces/itemCardapio";
import ItemCardapioService from "../../services/ItemCardapioService";
import SecaoCardapioService from "../../services/SeçãoCardapioService";
import ISecaoCardapio from "../../utils/interfaces/secaoCardapio";
import IAdicionalCardapio from "../../utils/interfaces/adicionalCardapio";
import AdicionalCardapioService from "../../services/AdicionalCardapioService";
import { toast } from "react-toastify";

const categories = Object.freeze({
  item: "Item",
  secao: "Seção",
  adicional: "Adicional"
} as const);

export function Cardapio() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<keyof typeof categories>(
    searchParams.get("category") as keyof typeof categories || "item"
  );

  const [itemData, setItemData] = useState<IItemCardapio[]>([]);
  const [sectionData, setSectionData] = useState<ISecaoCardapio[]>([]);
  const [additionalData, setAdditionalData] = useState<IAdicionalCardapio[]>([]);

  const itemDescriptor: DataTableDescriptor[] = [
    { title: "ID"         , type: "text" , size: 1 , key: "id" },
    { title: "Nome"       , type: "text" , size: 3 , key: "nome" },
    { title: "Descrição"  , type: "text" , size: 7 , key: "descricao" },
    {
      type: "action",
      key: "edit",
      size: 1,
      icon: <Pencil className={textColors["blue"]} size={24} />,
      action: (data: IItemCardapio) => {
        navigate(`/cardapio/item/${data.id}`);
      }
    },
    {
      key: "delete",
      type: "action",
      size: 1,
      icon: <Trash className={textColors["red"]} size={24} />,
      action: async (data: IItemCardapio) => {
        try {
          await ItemCardapioService.delete(data.id);

          const newData = await ItemCardapioService.list();
          setItemData(newData);
        } catch (err) {
          if (err instanceof Error)
            toast.error(err.message);
        }
      }
    }
  ];

  const sectionDescriptor: DataTableDescriptor[] = [
    { title: "ID"        , type: "text" , size: 1 , key: "id" },
    { title: "Nome"      , type: "text" , size: 10 , key: "nome" },
    {
      type: "action",
      key: "edit",
      icon: <Pencil className={textColors["blue"]} size={24} />,
      action: async (data: ISecaoCardapio) => {
        navigate(`/cardapio/secao/${data.id}`);
      }
    },
    {
      key: "delete",
      type: "action",
      icon: <Trash className={textColors["red"]} size={24} />,
      action: async (data: ISecaoCardapio) => {
        try {
          await SecaoCardapioService.delete(data.id);

          const newData = await SecaoCardapioService.list();
          setSectionData(newData);
        } catch (err) {
          if (err instanceof Error)
            toast.error(err.message);
        }
      }
    }
  ];

  const additionalDescriptor: DataTableDescriptor[] = [
    { title: "ID"        , type: "text" , size: 1 , key: "id" },
    { title: "Nome"      , type: "text" , size: 10 , key: "nome" },
    {
      type: "action",
      key: "edit",
      size: 1,
      icon: <Pencil className={textColors["blue"]} size={24} />,
      action: async (data: IAdicionalCardapio) => {
        navigate(`/cardapio/adicional/${data.id}`);
      }
    },
    {
      key: "delete",
      type: "action",
      size: 1,
      icon: <Trash className={textColors["red"]} size={24} />,
      action: async (data: IAdicionalCardapio) => {
        try {
          await AdicionalCardapioService.delete(data.id);

          const newData = await AdicionalCardapioService.list();
          setAdditionalData(newData);
        } catch (err) {
          if (err instanceof Error)
            toast.error(err.message);
        }
      }
    }
  ];

  useEffect(() => {
    ItemCardapioService.list().then((data) => {
      setItemData(data);
    });

    SecaoCardapioService.list().then((data) => {
      setSectionData(data);
    });

    AdicionalCardapioService.list().then((data) => {
      setAdditionalData(data);
    });
  }, []);

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

      <DataTableBar title={categories[category]} newButtonLink={
        category === "item" ? "/cardapio/item/novo" :
        category === "secao" ? "/cardapio/secao/novo" :
        "/cardapio/adicional/novo"
      }></DataTableBar>
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
