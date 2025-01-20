import { ReactNode } from "react";
import { textSizes, TextSizeType } from "../../../utils/style/TextSize";
import { textColors, TextColorType } from "../../../utils/style/TextColor";

type LabelProps = {
  bold?: boolean;
  light?: boolean;
  italic?: boolean;
  pointer?: boolean;
  className?: string;
  size?: TextSizeType;
  color?: TextColorType;

  children: ReactNode;
}

export function Label({
  children,
  bold,
  light,
  italic,
  pointer,
  size,
  color,
  className
}: LabelProps) {
  return <span className={`
    ${bold && "font-medium"}
    ${light && "font-extralight"}
    ${italic && "italic"}
    ${pointer && "cursor-pointer"}
    ${textSizes[size??"base"]}
    ${color && textColors[color]}
    word-spacing-normal
    ${className??""}
  `}>
    {children}
  </span>
}