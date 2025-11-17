import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home.jsx";
import ProductDetails from "@/pages/ProductDetails.jsx";
import Cart from "@/pages/Cart.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/products/:id", element: <ProductDetails /> },
            { path: "/cart", element: <Cart /> },
        ],
    },
])

export default router;