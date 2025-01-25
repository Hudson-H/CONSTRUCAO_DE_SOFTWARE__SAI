import { Pencil, Trash } from "@phosphor-icons/react"
import { Label } from "../../atoms/Label/Label"
import { SpanSize, SpanSizeType } from "../../../utils/style/SpanSize"
import { MouseEvent, MouseEventHandler, ReactNode } from "react"

type DataTableProps = {
  descriptor: DataTableDescriptor[];
  data: Record<string, string | number | Date>[];
  className?: string;
}

type DataTableHeaderProps = {
  descriptor: DataTableDescriptor[];
}

type DataTableRowProps = {
  descriptor: DataTableDescriptor[];
  data: Record<string, string | number | Date>;
}

export type DataTableDescriptor = {
  title: string;
  type: "text" | "number" | "date" | "action";
  key: string;
  size: SpanSizeType | 0;

  action?: (event: MouseEvent) => void;
  icon?: ReactNode;
}

function DataTableHeader({
  descriptor
}: DataTableHeaderProps) {
  return (
    <div className="w-full grid grid-cols-12 items-center py-4 cursor-pointer">
      {descriptor.map((item) => (
        <Label
          key={item.key}
          className={SpanSize[item.size]}
          bold
        >
          {item.title}
        </Label>
      ))}
    </div>
  )
}

function DataTableRow({
  descriptor,
  data
}: DataTableRowProps) {
  return (
    <div className="w-full grid grid-cols-12 items-center py-4">
      {descriptor.map((item) => {
        if (item.type === "action") {
          return (
            <div
              key={item.key}
              className={`inline-flex justify-end gap-2 ${item.size}`}
              >
              <div className="cursor-pointer" onClick={(ev) => {if (item.action) item.action(ev)}}>
                {item.icon}
              </div>
            </div>
          )
        }

        const value = data[item.key].toString();

        return (
          <Label
            key={item.title}
            className={SpanSize[item.size]} light
          >
            {value}
          </Label>
        )
      })}
    </div>
  )
}

export function DataTable({
  descriptor,
  data,
  className
}: DataTableProps) {
  return (
    <div
      className={`
        w-full h-full px-5 py-2
        border-2 rounded
        ${className}
      `}
    >
      <DataTableHeader descriptor={descriptor}></DataTableHeader>

      {data.map((row, index) => (
        <DataTableRow key={index} descriptor={descriptor} data={row} />
      ))}
    </div>
  )
}