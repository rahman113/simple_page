import React from "react";
import LoginPage from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: (
        <div className="flex items-center content-center bg-gray-800 justify-center text-center h-screen text-red-400">
          Page not fount
        </div>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
