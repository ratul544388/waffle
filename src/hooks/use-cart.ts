import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Food } from "@prisma/client";
import { CartItem, Extra } from "@/types";

interface CartStore {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (food: Food) => void;
  updateCart: ({
    cartItemId,
    quantity,
  }: {
    cartItemId: string;
    quantity: number;
  }) => void;
  deleteCart: (cartItemId: string) => void;
  addExtra: ({
    extras,
    cartItemId,
  }: {
    extras: Extra[];
    cartItemId: string;
  }) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (cartItems: CartItem[]) => set({ cart: cartItems }),
  addToCart: (food: Food) =>
    set((state) => {
      const quantity = 1;
      let newCart: CartItem[] = [];
      const localStorageCart: CartItem[] = JSON.parse(
        localStorage.getItem("waffle-cart") as string
      );
      if (localStorageCart) {
        const existingCart = localStorageCart.find(
          (item) => item.food.id === food.id
        );
        if (existingCart) {
          newCart = state.cart.map((item) =>
            item.food.id === food.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCart = [...state.cart, { id: uuid(), food, quantity, extras: [] }];
        }
      } else {
        newCart = [{ id: uuid(), food, quantity, extras: [] }];
      }
      updateLocalStorage(newCart);
      return { cart: newCart };
    }),
  updateCart: ({
    cartItemId,
    quantity,
  }: {
    cartItemId: string;
    quantity: number;
  }) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      );
      updateLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),
  deleteCart: (cartItemId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== cartItemId);
      updateLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),
  clearCart: () =>
    set(() => {
      updateLocalStorage([]);
      return { cart: [] };
    }),
  addExtra: ({ extras, cartItemId }: { extras: Extra[]; cartItemId: string }) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              extras,
            }
          : item
      );
      updateLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),
}));

const updateLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("waffle-cart", JSON.stringify(cart));
};
