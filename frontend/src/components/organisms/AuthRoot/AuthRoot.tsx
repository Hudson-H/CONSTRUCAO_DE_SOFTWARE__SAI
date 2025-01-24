import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { SAILogo } from "../../molecules/SAILogo/SAILogo";

export function AuthRoot() {
  return <div className="w-full h-screen font-display text-base bg-white">
    <Outlet/>
  </div>
}