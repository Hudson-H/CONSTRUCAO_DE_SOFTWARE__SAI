import React, { ReactNode } from "react"
import { Label } from "../../atoms/Label/Label"
import { BookOpen, Hamburger, ListMagnifyingGlass, Package, PlusCircle, UsersThree } from "@phosphor-icons/react";
import { Title } from "../../atoms/Title/Title";
import Button from "../../atoms/Button/Button";

const sidebarButtons = [
  { label: "Novo Pedido"  , icon: <PlusCircle size={24} /> },
  { label: "Ver Pedidos"  , icon: <ListMagnifyingGlass size={24} /> },
  { label: "Cardápio"     , icon: <BookOpen size={24} /> },
  { label: "Estoque"      , icon: <Package size={24} /> },
  { label: "Funcionários" , icon: <UsersThree size={24} /> },
]


type SidebarButtonProps = {
  label: string;
  icon: ReactNode;
}

function SidebarButton({ label, icon }: SidebarButtonProps) {
  return <Button color="transparent" icon={icon} className="px-0 py-2 w-full">
    { label }
  </Button>
}

export function Sidebar() {
  return <div className="
      flex
      row-span-12 col-span-2 p-4
      shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]
      border-t-4 border-[#0099ff]
      flex-col justify-start items-start gap-8
      overflow-hidden
      font-inherit
    ">
    <Title className="justify-start items-center gap-2 inline-flex">
      <Hamburger size={32} /> SAI
    </Title>

    <div className="gap-3 flex flex-col">
      <Label>Ações</Label>
      <div className="flex flex-col justify-start items-start h-full w-full">
        {sidebarButtons.map(SidebarButton)}
      </div>
    </div>
  </div>
}