import MainLayout from "@/layouts/MainLayout.jsx";
import Cart from "@/pages/Cart.jsx";
import Checkout from "@/pages/Checkout.jsx";
import Home from "@/pages/Home.jsx";
import ProductDetails from "@/pages/ProductDetails.jsx";
import Shop from "@/pages/Shop.jsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/products/:id", element: <ProductDetails /> },
            { path: "/cart", element: <Cart /> },
            { path: "/shop", element: <Shop /> },
            { path: "/checkout", element: <Checkout /> },
        ],
    },
])

export default router;