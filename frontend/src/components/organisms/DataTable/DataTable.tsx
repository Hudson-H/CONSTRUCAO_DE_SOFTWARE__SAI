import { Pencil, Trash } from "@phosphor-icons/react"
import { Label } from "../../atoms/Label/Label"
import { SpanSize, SpanSizeType } from "../../../utils/style/SpanSize"
import { MouseEvent, MouseEventHandler, ReactNode } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

type DataTableProps = {
  descriptor: DataTableDescriptor[];
  data: Object[];
  className?: string;
}

type DataTableHeaderProps = {
  descriptor: DataTableDescriptor[];
}

type DataTableRowProps = {
  descriptor: DataTableDescriptor[];
  data: Object;
}

export type DataTableDescriptor = {
  title?: string;
  type: "text" | "number" | "date" | "action";
  key: string;
  size?: SpanSizeType;

  action?: (data: any) => void;
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
          className={SpanSize[item.size??0]}
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
  data,
}: DataTableRowProps) {
  const actions = descriptor.filter(value => value.type === "action");

  return (
    <div className="w-full grid grid-cols-12 items-center py-4">
      {descriptor.filter((val) => val.type !== "action").map((item) => {
        if (!(item.key in data)) return (
          <Label
            key={item.title}
            className={SpanSize[item.size??0]} light
            children="N/A"
          ></Label>
        );

        // @ts-ignore
        let value = data[item.key];
        if (item.type === "date") {
          value = new Date(value).toLocaleDateString();
        } else if (item.type === "number") {
          value = new Intl.NumberFormat("pt-BR").format(value);
        }

        return (
          <Label
            key={item.title}
            className={SpanSize[item.size??0]} light
          >
            {value}
          </Label>
        )
      })}
      <div className="inline-flex justify-end gap-2 col-span-1">
        {actions.map((item) => {
          return (
            <div key={item.key}>
              <div className="cursor-pointer" onClick={(ev) => {if (item.action) item.action(data)}}>
                {item.icon}
              </div>
            </div>
          )
        })}
      </div>
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