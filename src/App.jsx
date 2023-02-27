// import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import Product from "./pages/product/Product";

function App() {
  const name = localStorage.getItem("name");

  const router = createBrowserRouter([
    {
      path: "/",
      element: !name ? <Landing /> : <Home/>,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/products/:id",
      element: <Product />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
