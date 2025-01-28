import React, { ReactNode, useState } from "react";
import Button from "../../atoms/Button/Button";
import { Title } from "../../atoms/Title/Title";
import Input from "../../atoms/Input/Input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

type DataTableBarProps = {
  title: string;
  newButtonLink: string;
  className?: string;
};

export function DataTableBar({ title, newButtonLink, className }: DataTableBarProps) {
  const [searchValue, setSearch] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  return <div className={`
      flex flex-row items-center justify-between
      p-0
      ${className}
    `}>
    <Title>{title}</Title>
    <div className="flex gap-4 items-center h-8">
      <Input
    type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder={
          `Buscar por: '${title.toLowerCase()}'`
        }
        icon={<MagnifyingGlass className="opacity-25" weight="bold" size={16}/>}
        className="text-sm h-full"
      ></Input>
      <Link to={newButtonLink}>
        <Button className="h-full" color="blue">
          Novo
        </Button>
      </Link>
    </div>
  </div>;
}