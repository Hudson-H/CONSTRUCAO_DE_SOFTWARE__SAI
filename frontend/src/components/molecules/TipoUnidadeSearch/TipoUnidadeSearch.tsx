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
import TipoUnidadeService from "../../../services/TipoUnidadeService";

type TipoUnidadeSearchProps = {
  value?: {name: string, key: string};
  onChange: (value: {name: string, key: string}) => void;
}

export default function TipoUnidadeSearch({
  value,
  onChange
}: TipoUnidadeSearchProps) {
  const [query, setQuery] = useState("");
  const [item, setItem] = useState("");
  const [searchData, setSearchData] = useState<{name: string, key: string}[]>([]);

  async function updateQuery(search: string) {
    debounce(async () => {
      const response = await TipoUnidadeService.search(search);

      setSearchData(
        response.map((item) => {
          return {
            name: item.nome,
            key: item.id,
          };
        })
      );
    }, 100)();
  }

  return (
    <Combobox
      value={value}
      onChange={(data) => {
        setItem(data);
        onChange(data);
      }}
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
            updateQuery(ev.target.value);
          }}
        ></ComboboxInput>

        <ComboboxOptions
          anchor="bottom"
          className="
          w-[var(--input-width)] rounded-xl border-2 bg-white p-0 mt-1 [--anchor-gap:var(--spacing-1)] empty:invisible
        "
        >
          {searchData.map((item) => {
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
