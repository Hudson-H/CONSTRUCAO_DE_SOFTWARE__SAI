import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { ClockClockwise, CheckCircle } from "@phosphor-icons/react";
import { Label } from "../../atoms/Label/Label";
import TrackingButtton from "../../molecules/TrackingButton/TrackingButton";
import { Header } from "../Header/Header";

export function Root() {
  return <div className="grid grid-cols-12 grid-rows-12 gap-0 font-display text-base">
    <Sidebar />
    <Header />

    <div className="col-span-10 px-4 py-2">
      <Outlet />
    </div>
  </div>
}