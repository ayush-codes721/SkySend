import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
