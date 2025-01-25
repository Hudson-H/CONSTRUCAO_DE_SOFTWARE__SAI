import { ReactNode } from "react"

type SidebarProps = {
  className?: string;
  children: ReactNode;
}

export function Sidebar({
  className,
  children
}: SidebarProps) {
  return <div className={`
    flex
    row-span-12 col-span-2 p-4 h-full
    shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]
    border-t-4 border-[#0099ff]
    flex-col justify-start items-start gap-8
    overflow-hidden
    font-inherit
    ${className}
  `}>
    {children}
  </div>
}