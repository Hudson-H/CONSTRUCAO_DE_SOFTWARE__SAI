import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { PlusCircle, ListMagnifyingGlass, BookOpen, Package, UsersThree } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import { SAILogo } from "../../molecules/SAILogo/SAILogo";

const sidebarButtons = [
  { label: "Novo Pedido"  , icon: <PlusCircle size={24} />          , linkTo: "/pedidos/novo"},
  { label: "Ver Pedidos"  , icon: <ListMagnifyingGlass size={24} /> , linkTo: "/pedidos"},
  { label: "Cardápio"     , icon: <BookOpen size={24} />            , linkTo: "/cardapio"},
  { label: "Estoque"      , icon: <Package size={24} />             , linkTo: "/estoque"},
  { label: "Funcionários" , icon: <UsersThree size={24} />          , linkTo: "/funcionarios"},
]

type SidebarButtonProps = {
  label: string;
  linkTo: string;
  icon: ReactNode;
}

function SidebarButton({ label, icon, linkTo }: SidebarButtonProps) {
  return <Link to={linkTo} color="transparent" className="
    py-2 px-0 rounded justify-start items-center gap-2 inline-flex overflow-hidden
    hover:brightness-95
    transition
  ">
    { icon }
    { label }
  </Link>
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

    <div className="w-full h-full row-span-11 col-span-10 px-8 pb-8">
      <Outlet />
    </div>
  </div>
}