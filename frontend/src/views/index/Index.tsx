import { CheckCircle, ClockClockwise, Horse } from "@phosphor-icons/react";
import Button from "../../components/atoms/Button/Button";
import TrackingButtton from "../../components/molecules/TrackingButton/TrackingButton";
import Text from "../../components/atoms/Text/Text";

export function Index() {
    return <div className="font-display text-base"> 
        <Text color="black" weight="bold" size="xl">adsadasds</Text>

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
}