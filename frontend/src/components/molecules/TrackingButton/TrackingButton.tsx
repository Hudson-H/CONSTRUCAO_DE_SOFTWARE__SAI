import React, { ReactNode } from "react";
import Button, { ButtonColorsType } from "../../atoms/Button/Button";
import { redirect, useLocation, useNavigate } from "react-router-dom";

export type TrackingButttonProps = {
  color: ButtonColorsType;
  counter: number;
  icon: ReactNode;
  linkTo: string;
  children: ReactNode;
  className?: string;
};

export default function TrackingButtton({
  color,
  counter,
  icon,
  linkTo,
  children,
  className,
}: TrackingButttonProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Button
      color={color}
      icon={icon}
      className={`
        gap-2 inline-flex
        ${className ?? ""}
      `}
      onClick={() => {
        const from = location.pathname;
        navigate(linkTo);

        const to = location.pathname;
        if (from === to) navigate(0);
      }}
    >
      {children}
      <div className="w-6 aspect-square py-0.5 bg-black/15 rounded-3xl justify-center items-center inline-flex overflow-hidden">
        {counter}
      </div>
    </Button>
  );
}
