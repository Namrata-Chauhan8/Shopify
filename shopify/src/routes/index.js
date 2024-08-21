import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/account/Login";
import Signup from "../pages/account/Signup";
import AdminPanel from "../pages/admin/AdminPanel";
import AllUsers from "../pages/admin/AllUsers";
import AllProducts from "../pages/admin/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "adminPanel",
        element: (
          <div>
            <AdminPanel />
          </div>
        ),
        children: [
          {
            path: "allUsers",
            element: (
              <div>
                <AllUsers />
              </div>
            ),
          },
          {
            path: "uploadProducts",
            element: (
              <div>
                <AllProducts />
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
