import React, { MouseEventHandler, ReactNode } from "react";

const buttonColors = {
    "transparent": "bg-transparent",
    "yellow": "bg-yellow-200",
    "blue": "bg-blue-200",
    "gray": "bg-gray-300",
    "white": "bg-white"
} as const;

export type ButtonColorsType = keyof typeof buttonColors;

type ButtonProps = {
    color: ButtonColorsType;
    children: ReactNode;
    icon?: ReactNode;

    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string;

};

export default function Button({
    icon,
    color,
    className,
    onClick,
    disabled,
    children
}: ButtonProps) {
    return <button
        className={`
            ${buttonColors[color]}
            py-1 px-2 rounded justify-start items-center gap-2 inline-flex overflow-hidden
            hover:brightness-95
            transition
            ${disabled ? "cursor-wait bg-shark-950 bg-opacity-25" : ""}
            ${className??""}
        `}
        onClick={onClick}
        disabled={disabled}
    >
        { icon }
        { children }
    </button>
}