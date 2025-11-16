import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useCartStore = create(
    persist((set, get) => ({
        cart: [],

        // Add item
        addToCart: (product) => {
            set((state) => ({cart: [...state.cart, product]}))
        },

        // Remove item
        removeFromCart: (id) =>
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== id),
            })),

        // Getter: NOT persisted, recomputed each time
        cartCount: () => get().cart.length,
    }))
);

/**
export const useCartStore = create(
    (set, get) => ({
        cart: [],

        // Add item
        addToCart: (product) => {
            set((state) => ({cart: [...state.cart, product]}))
        },

        // Remove item
        removeFromCart: (id) =>
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== id),
            })),

        // Getter: NOT persisted, recomputed each time
        cartCount: () => get().cart.length,
    })
);
*/