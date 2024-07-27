import React from "react";
// import "./App.css";
import Home from "./home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./home/ProductDetail";

const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },
  { path: "/:id", element: <ProductDetail></ProductDetail> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
