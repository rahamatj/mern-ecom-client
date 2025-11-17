import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useCartStore = create(
    persist((set, get) => ({
            cart: [],

            // Add item
            addToCart: (product) => {
                set((state) => ({cart: [...state.cart, product]}))
            },

            handleProductIncrement: (id) => {
                set((state) => ({
                    cart: state.cart.map((p) =>
                        p._id === id ? { ...p, qty: p.qty + 1 } : p
                    ),
                }));
            },

            handleProductDecrement: (id) => {
                set((state) => ({
                    cart: state.cart.map((p) =>
                        p._id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
                    ),
                }));
            },

            // Remove item
            removeFromCart: (id) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item._id !== id),
                }))
            },


            // Getter: NOT persisted, recomputed each time
            cartCount: () => get().cart.length,

            totalPrice: () => (id) => {
                get((state) => ({
                    cart: state.cart.map((p) =>
                        p._id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
                    ),
                }));
            },

            totalPriceOfProduct: (id) => {
                const product = get().cart.find((p) => p._id === id);
                if (!product) return 0;
                return ((product.price || 0) * (product.qty || 1)).toFixed(2);
            },
        }),
        {
            name: "cart",  // 👈 custom localStorage key name
        }
    )
);