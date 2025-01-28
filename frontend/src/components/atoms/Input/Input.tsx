import { HTMLInputTypeAttribute, ChangeEventHandler, ReactNode } from "react";

type InputProps = {
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
  placeholder: string;
  value: string;
  className?: string;
  borderless?: boolean;
  icon?: ReactNode;

  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({ type, disabled, placeholder, value, borderless, icon, onChange, className }: InputProps) {
  return <div
    className={`
      ${borderless ? "px-0": "px-2"} py-2 content-between items-center self-stretch
      ${disabled ?
        "bg-silver-chalice-400 bg-opacity-25 text-silver-chalice-400 cursor-not-allowed"
        :
        "bg-serenade-50"
      }
      ${!borderless && "border-2 border-silver-chalice-400 border-opacity-25 rounded"}
      flex flex-row items-center gap-2
      border-b-2
      ${className}
    `}
    >
      {icon && icon}
      <input
    type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-full leading-normal tracking-wider font-roboto text-justify outline-none select-none"
      />
  </div>
}