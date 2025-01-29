import { HTMLInputTypeAttribute, ChangeEventHandler, ReactNode } from "react";
import CurrencyInput from "react-currency-input-field";

type InputProps = {
  type: HTMLInputTypeAttribute | "currency";
  disabled?: boolean;
  placeholder: string;
  value: string | number;
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
      {type === "currency" ?
        <CurrencyInput
          id="validationCustom01"
          name="input-1"
          allowDecimals={true}
          className={`${className}`}
          decimalScale={2}
          decimalsLimit={2}
          fixedDecimalLength={2}
          allowNegativeValue={false}
          value={value}
          onValueChange={(value) => {
            onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
          }}
          placeholder="Please enter a number"
          prefix="R$"
          step={.01}
          maxLength={5}
        />
        :
        <input
          type={type}
          step={type === "number" ? "0.01" : undefined}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full h-full
            leading-normal tracking-wider font-roboto text-justify
            outline-none select-none overflow-y-visible
            font-light
          "
        />
      }
  </div>
}