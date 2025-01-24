import { ReactNode } from "react";
import { Label } from "../../atoms/Label/Label";
import { Spacer } from "../../atoms/Spacer/Spacer";

type FormFieldProps = {
  // type: HTMLInputTypeAttribute | "textarea";
  // placeholder: string;
  // value: string;
  className?: string;
  children?: ReactNode;
  haveError?: boolean;
  errorMessage?: string;

  // onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function FormField({ children, className, haveError, errorMessage }: FormFieldProps) {
  return <div className={`
    flex flex-col items-start self-stretch gap-2 pb-2 ${className??""}
  `}>
    {children}

    {haveError &&
      <Spacer className="text-sm text-serenade-700 font-medium">
        <span className="bg-serenade-700 bg-opacity-25 rounded-full px-2">!</span> &nbsp;
        <Label color="red" size="sm" className="w-full text-left font-medium">{errorMessage}</Label>
      </Spacer>
    }
  </div>
}