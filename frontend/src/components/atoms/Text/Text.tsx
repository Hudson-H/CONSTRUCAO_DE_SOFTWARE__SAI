import React, { ReactNode } from "react";

const textColors = {
    "black": "text-black",
    "white": "text-white"
} as const;

const textWeights = {
    "extra-light": "font-extralight",
    "light": "font-light",
    "normal": "font-normal",
    "medium": "font-medium",
    "semi-bold": "font-semibold",
    "bold": "font-bold",
    "extra-bold": "font-extrabold",
    "black": "font-black",
} as const;

const textSizes = {
    "sm": "text-xs",
    "base": "text-base",
    "xl": "text-2xl"
} as const;

export type TextColorType = keyof typeof textColors;
export type TextWeightType = keyof typeof textWeights;
export type TextSizeType = keyof typeof textSizes;

type Text = {
    color: TextColorType;
    weight: TextWeightType;
    size: TextSizeType;
    children: ReactNode;
    className?: string;
};

export default function Text({
    color,
    weight,
    size,
    className,
    children
}: Text) {
    return <span 
        className={` 
            ${textColors[color]}
            ${textWeights[weight]}
            ${textSizes[size]}
            ${className??""}
        `}
    >
        { children }
    </span>
}