import React, { ReactNode } from "react";

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
    className?: string;
};

export default function Button({
    icon,
    color,
    className,
    children
}: ButtonProps) {
    return <button 
        className={` 
            ${buttonColors[color]}
            py-1 px-2 rounded justify-start items-center gap-2 inline-flex overflow-hidden
            ${className??""}
        `}
    >
        { icon }
        { children }
    </button>
}