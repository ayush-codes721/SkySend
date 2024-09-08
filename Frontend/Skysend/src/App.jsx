import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Mail from "./Pages/Mail";
import History from "./Pages/History";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import MailForm from "./Pages/Mail";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mail",
        element: <MailForm />,
      },
      {
        path: "/history",
        element: <History />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </RecoilRoot>
    </>
  );
}
