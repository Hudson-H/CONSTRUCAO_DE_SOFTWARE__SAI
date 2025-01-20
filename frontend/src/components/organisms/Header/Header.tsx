import { ClockClockwise, CheckCircle } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import TrackingButtton from "../../molecules/TrackingButton/TrackingButton";

export function Header() {
  return <div className="
    items-center inline-flex h-16 px-4 py-2 justify-between col-span-10
    sticky top-0
  ">
    <div className="justify-start items-center gap-4 flex">
      <TrackingButtton
        counter={0}
        linkTo=""
        color="yellow"
        icon={<ClockClockwise size={32} />}
      >
        Pedidos em Andamento
      </TrackingButtton>

      <TrackingButtton
        counter={0}
        linkTo=""
        color="blue"
        icon={<CheckCircle size={32} />}
      >
        Pedidos Preparados
      </TrackingButtton>
    </div>

    <div>
      <Label light>Olá, </Label>
      Nícolas
    </div>
  </div>
}