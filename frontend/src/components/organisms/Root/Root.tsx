import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { PlusCircle, ListMagnifyingGlass, BookOpen, Package, UsersThree } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import { SAILogo } from "../../molecules/SAILogo/SAILogo";

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

export function Root() {
  return <div className="grid grid-cols-12 grid-rows-12 gap-0 h-screen font-display text-base">
    <Sidebar>
      <SAILogo />

      <div className="gap-3 flex flex-col">
        <Label>Ações</Label>
        <div className="flex flex-col justify-start items-start h-full w-full">
          {sidebarButtons.map(SidebarButton)}
        </div>
      </div>
    </Sidebar>
    <Header />

    <div className="col-span-10 px-4 py-2">
      <Outlet />
    </div>
  </div>
}