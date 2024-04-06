import { Extra, OrderItem } from "@/types";
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
  deleteOrder: (orderItemId: string) => void;
  addExtra: ({
    orderItemId,
    extras,
  }: {
    orderItemId: string;
    extras: Extra[];
  }) => void;
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
  addExtra: ({
    extras,
    orderItemId,
  }: {
    extras: Extra[];
    orderItemId: string;
  }) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderItemId ? { ...order, extras } : order
      ),
    })),
}));
