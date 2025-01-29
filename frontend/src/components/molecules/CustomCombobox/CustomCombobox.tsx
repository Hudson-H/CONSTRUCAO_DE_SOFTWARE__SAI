import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import { useEffect, useState } from "react";
import ItemEstoqueService from "../../../services/ItemEstoqueService";
import debounce from "../../../utils/debounce";
import CategoriaEstoqueService from "../../../services/CategoriaEstoqueService";

type ComboboxProps = {
  data: {name: string, key: string}[];
  value?: {name: string, key: string};
  onWrite: (search: string) => void;
  onChange: (value: {name: string, key: string}) => void;
}

export default function CustomCombobox({
  data,
  value,
  onWrite,
  onChange
}: ComboboxProps) {
  const [query, setQuery] = useState("");

  return (
    <Combobox
      value={value}
      onChange={onChange}
      onClose={() => {
        setQuery("")
      }}
    >
      <div
        className="
          relative
          py-2 content-between self-stretch
          flex flex-row items-center gap-2
          border-b-2
        "
      >
        <MagnifyingGlassPlus className="opacity-25" weight="bold" size={16} />
        <ComboboxInput
          className="
            w-full h-full
            leading-normal tracking-wider font-roboto text-justify
            outline-none select-none overflow-y-visible
            font-light
          "
          displayValue={(data: { name: string; key: string }) => {
            return data?.name;
          }}
          onChange={(ev) => {
            onWrite(ev.target.value);
          }}
        ></ComboboxInput>

        <ComboboxOptions
          anchor="bottom"
          className="
          w-[var(--input-width)] rounded-xl border-2 bg-white p-0 mt-1 [--anchor-gap:var(--spacing-1)] empty:invisible
        "
        >
          {data.map((item) => {
            return (
              <ComboboxOption
                key={item.key}
                value={item}
                className="w-full py-2 px-4 hover:bg-gray-200 cursor-pointer"
              >
                <Label>{item.name}</Label>
              </ComboboxOption>
            );
          })}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
