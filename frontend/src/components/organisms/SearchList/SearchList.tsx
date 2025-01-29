import { CaretLeft, CaretRight, MagnifyingGlassPlus } from "@phosphor-icons/react";
import Input from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import { FormEvent, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

export type SearchListRow = {
  key: string;
  name: string;
  price?: number;
  additionals?: string[];
  amount?: number;
};

type SearchListProps = {
  searchValue: string;
  items: SearchListRow[];
  searchData: {key: string, name: string}[];

  enablePrice?: boolean;
  enableAdditionals?: boolean;
  enableAmount?: boolean;
  doNotStackItens?: boolean;

  onSearchChange: (search: string) => void;
  onChange: (value: SearchListRow[]) => void;
};

export default function SearchList({
  searchValue,
  items,
  searchData,

  enablePrice,
  enableAdditionals,
  enableAmount,
  doNotStackItens,

  onSearchChange,
  onChange,
}: SearchListProps) {
  const [itemSearch, setItemSearch] = useState<string>("");

  async function addItem(value: {name: string, key: string, price?: number}) {
    if (!value) return;
    const item = items.find(val => val.key === value.key);

    if (item && item.amount !== undefined && !doNotStackItens) {
      item.amount += 1;
      onChange([...items]);
      return;
    }

    onChange([...items, {
      key: value.key,
      name: value.name,
      price: value.price??0,
      amount: 1,
    }]);
  }

  async function changeQuantity(item: SearchListRow, type: "add" | "remove") {
    if (!("amount" in item)) return;

    if (type === "add") {
      item.amount = item.amount ? item.amount + 1 : 1;
    }

    if (type === "remove") {
      item.amount = item.amount ? item.amount - 1 : 0;
      if (item.amount === 0)
        items = items.filter(val => val !== item)
    }

    onChange([...items]);
  }

  return <div className="flex flex-col w-full min-h-64 px-4 pt-2 py-6 rounded border-2 mt-2">
    {items.length > 0 ?
      items.map((item, index) => {
        return <div key={index} className="w-full flex flex-row justify-between items-center py-4 gap-4">
          <Label light className="grow">{item.name}</Label>
          {enablePrice && item.price !== undefined ? <Label>R$ {item.price.toFixed(2)}</Label> : null}
          {enableAdditionals ?
            <div className="flex gap-4" >
              Ver Adicionais
              <div className="w-6 aspect-square py-0.5 bg-black/15 rounded-3xl justify-center items-center inline-flex overflow-hidden">
                {item.additionals?.length??0}
              </div>
            </div>
             : null
          }
          {enableAmount ?
            <div className="inline-flex items-center gap-2">
              <CaretLeft className="cursor-pointer" onClick={(ev) => {
                changeQuantity(item, "remove");
              }}/>
              {item.amount}
              <CaretRight className="cursor-pointer" onClick={(ev) => {
                changeQuantity(item, "add");
              }}/>
            </div> : null
          }
        </div>
      })
      :
      <div className="w-full text-center py-4">
        <Label light color="black" className="w-full text-opacity-25">
          Nenhum item adicionado
        </Label>
      </div>
    }

    <Combobox
      value={itemSearch}
      onChange={(value) => {
        setItemSearch("");
        console.log(value);
        addItem(value);
      }}
      onClose={() => onSearchChange('')}
    >
      <div className="
          relative
          py-2 content-between self-stretch
          flex flex-row items-center gap-2
          border-b-2
        "
      >
        <MagnifyingGlassPlus className="opacity-25" weight="bold"  size={16} />
        <ComboboxInput
          className="
            w-full h-full
            leading-normal tracking-wider font-roboto text-justify
            outline-none select-none overflow-y-visible
            font-light
          "
          displayValue={(data: {name: string, key: string}) => {
            return data?.name;
          }}
          onChange={(ev) => {
            onSearchChange(ev.target.value);
          }}
        >
        </ComboboxInput>

        <ComboboxOptions anchor="bottom" className="
          w-[var(--input-width)] rounded-xl border-2 bg-white p-0 mt-1 [--anchor-gap:var(--spacing-1)] empty:invisible
        ">
          {searchData.map((item, index) => {
            return <ComboboxOption
              key={item.key}
              value={item}
              className="w-full py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <Label>{item.name}</Label>
            </ComboboxOption>
          })}
        </ComboboxOptions>
      </div>
    </Combobox>

    {/* <Input
      type="text"
      placeholder="Buscar por item..."
      icon={<MagnifyingGlassPlus className="opacity-25" weight="bold"  size={16} />}
      value={itemSearch}
      onChange={(ev) => {
        setItemSearch(ev.target.value);
      }}
      borderless
    ></Input> */}
  </div>
}