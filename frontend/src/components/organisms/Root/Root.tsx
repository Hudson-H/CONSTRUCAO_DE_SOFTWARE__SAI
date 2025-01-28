import { ReactNode, useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../atoms/Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { PlusCircle, ListMagnifyingGlass, BookOpen, Package, UsersThree } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import { SAILogo } from "../../molecules/SAILogo/SAILogo";
import { AuthContext } from "../../../context/AuthContext";

const sidebarButtons = [
  { label: "Novo Pedido"  , icon: <PlusCircle size={24} />          , linkTo: "/pedido/novo"},
  { label: "Ver Pedidos"  , icon: <ListMagnifyingGlass size={24} /> , linkTo: "/pedido"},
  { label: "Cardápio"     , icon: <BookOpen size={24} />            , linkTo: "/cardapio"},
  { label: "Estoque"      , icon: <Package size={24} />             , linkTo: "/estoque"},
  { label: "Funcionários" , icon: <UsersThree size={24} />          , linkTo: "/funcionario"},
]

type SidebarButtonProps = {
  label: string;
  linkTo: string;
  icon: ReactNode;
}

function SidebarButton({ label, icon, linkTo }: SidebarButtonProps) {
  return <Link
    key={label}
    to={linkTo} color="transparent" className="
    py-2 px-0 rounded justify-start items-center gap-2 inline-flex overflow-hidden
    hover:brightness-95
    transition
  ">
    { icon }
    { label }
  </Link>
}

export function Root() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated().then(value => {
      if (!value) navigate("/login");
    })
  }, [])

  return <div className="grid grid-cols-12 grid-rows-12 gap-0 h-screen font-display text-base">
    <Sidebar>
      <Link to="/dashboard">
        <SAILogo />
      </Link>

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