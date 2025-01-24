import { Pencil, Trash } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import { Label } from "../../components/atoms/Label/Label";
import { Title } from "../../components/atoms/Title/Title";
import { useState } from "react";

const categories = ["Item", "Seção", "Adicional"] as const;

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

      <div
        className="
      w-full h-full px-5 py-2
      border-2 rounded
    "
      >
        <div className="w-full grid grid-cols-12 items-center py-4">
          <Label className="col-span-11" light>
            Lanches
          </Label>
          <div className="inline-flex justify-end gap-2 col-span-1">
            <Pencil className="cursor-pointer" size={24} />
            <Trash className="cursor-pointer text-red-600" size={24} />
          </div>
        </div>

        <div className="w-full grid grid-cols-12 items-center py-4">
          <Label className="col-span-11" light>
            Bebidas
          </Label>
          <div className="inline-flex justify-end gap-2 col-span-1">
            <Pencil className="cursor-pointer" size={24} />
            <Trash className="cursor-pointer text-red-600" size={24} />
          </div>
        </div>

        <div className="w-full grid grid-cols-12 items-center py-4">
          <Label className="col-span-11" light>
            Porções
          </Label>
          <div className="inline-flex justify-end gap-2 col-span-1">
            <Pencil className="cursor-pointer" size={24} />
            <Trash className="cursor-pointer text-red-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
