import { Hamburger } from "@phosphor-icons/react";
import { Title } from "../../atoms/Title/Title";

type SAILogoProps = {
  className?: string
}

export function SAILogo({className}: SAILogoProps) {
  return <>
    <Title className={`
      justify-start items-center gap-2 inline-flex cursor-pointer
      ${className??""}
    `}>
      <Hamburger size={32} /> SAI
    </Title>
  </>
}