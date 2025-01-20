import { ReactNode } from "react";
import { Label } from "../Label/Label";
import { TextSizeType } from "../../../utils/style/TextSize";

type TitleProps = {
  size?: TextSizeType;
  className?: string;

  children: ReactNode;
}

export function Title({ size, children, className }: TitleProps) {
  return <Label
    size={size??"xl"}
    color="black"
    className={`leading-normal font-display ${className}`}
    bold
  >
    {children}
  </Label>
}