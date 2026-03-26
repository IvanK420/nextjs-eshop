import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../generated/prisma/browser";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: (products: Product[]) => number;
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === productId);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { id: productId, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
      getTotalPrice: (productsFromApi) => {
        return get().items.reduce((acc, item) => {
          const product = productsFromApi.find((p) => p.id === item.id);
          return acc + (product ? product.price * item.quantity : 0);
        }, 0);
      },
    }),
    {
      name: "cart_storage", // Nom de la clé dans le localStorage
    },
  ),
);
