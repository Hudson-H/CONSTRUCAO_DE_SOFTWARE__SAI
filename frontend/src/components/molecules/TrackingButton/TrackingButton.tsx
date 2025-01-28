import React, { ReactNode } from "react";
import Button, { ButtonColorsType } from "../../atoms/Button/Button";

export type TrackingButttonProps = {
    color: ButtonColorsType;
    counter: number;
    icon: ReactNode;
    linkTo: string;
    children: ReactNode;
    className?: string;
}

export default function TrackingButtton({
    color,
    counter,
    icon,
    linkTo,
    children,
    className
}: TrackingButttonProps) {
    return <Button 
        color={color} 
        icon={icon}
        className={`
            gap-2 inline-flex
            ${className??""}
        `}
    >
        {children}
        <div className="w-6 aspect-square py-0.5 bg-black/15 rounded-3xl justify-center items-center inline-flex overflow-hidden">
            {counter}
        </div>
    </Button>

}