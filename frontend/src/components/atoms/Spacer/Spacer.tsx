import { ReactNode } from "react"

type SpacerProps = {
  className?: string;
  children?: ReactNode;
}

export function Spacer({ className, children }: SpacerProps) {
  return <div className={`
    word-spacing-2
    ${className}
  `}>
    {children}
  </div>
}