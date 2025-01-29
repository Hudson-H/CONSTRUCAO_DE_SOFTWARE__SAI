import { ClockClockwise, CheckCircle, SignOut } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import TrackingButtton from "../../molecules/TrackingButton/TrackingButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await logout();
      toast.info("Deslogado com sucesso!");

      navigate("/login");
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message);
    }
  }

  return <div className="
    items-center inline-flex h-16 px-8 py-2 justify-between col-span-10
    sticky top-0
  ">
    <div className="justify-start items-center gap-4 flex">
      <TrackingButtton
        counter={0}
        linkTo="/pedido?category=preparando"
        color="yellow"
        icon={<ClockClockwise size={32} />}
      >
        Pedidos em Andamento
      </TrackingButtton>

      <TrackingButtton
        counter={0}
        linkTo="/pedido?category=pronto"
        color="blue"
        icon={<CheckCircle size={32} />}
      >
        Pedidos Preparados
      </TrackingButtton>
    </div>

    <div className="flex gap-4 items-center">
      <span>
        <Label className="font-extralight text-lg">Olá, </Label>
        {user && <Label className="text-lg">{user.name}</Label>}
      </span>
      <span data-tooltip-id="tooltip-controller" data-tooltip-content="Logout!">
        <Button
          icon={<SignOut size={16} weight="bold"/>}
          color={"gray"}
          children={undefined}
          className=""
          onClick={handleLogout}
        ></Button>
      </span>
    </div>
  </div>
}