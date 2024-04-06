import { OrderItem } from "@/types";
import { Food } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createFoodModal" | "updateFoodModal" | "deleteFoodModal" | "orderModal"
interface ModalData {
  id?: string;
  name?: string;
  orderItems?: OrderItem[];
  clearCart?: boolean;
  food?: Food;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
