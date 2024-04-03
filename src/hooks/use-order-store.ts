import { OrderItem } from "@/types";
import { create } from "zustand";

interface OrderStore {
  orders: OrderItem[];
  setOrders: (cart: OrderItem[]) => void;
  updateOrders: ({
    orderItemId,
    quantity,
  }: {
    orderItemId: string;
    quantity: number;
  }) => void;
  deleteOrder: (cartItemId: string) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  setOrders: (cartItems: OrderItem[]) => set({ orders: cartItems }),
  updateOrders: ({
    orderItemId,
    quantity,
  }: {
    orderItemId: string;
    quantity: number;
  }) =>
    set((state) => ({
      orders: state.orders.map((item) =>
        item.id === orderItemId ? { ...item, quantity } : item
      ),
    })),
  deleteOrder: (orderItemId) =>
    set((state) => ({
      orders: state.orders.filter((item) => item.id !== orderItemId),
    })),
}));
